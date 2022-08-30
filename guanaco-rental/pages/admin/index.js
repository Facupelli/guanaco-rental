import Head from "next/head";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth";
import { getUniqueUser } from "../../utils/fetch_users";
import { authOptions } from "../api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import Calendar from "react-calendar";

import s from "../../styles/AdminPage.module.scss";
import { formatPrice } from "../../utils/price_formater";
import Gear from "../../components/OrderCard/Gear/Gear";

export default function AdminPage({ session }) {
  const [bookings, setBookings] = useState([]);
  const [dayBookings, setDayBookings] = useState([]);

  console.log(dayBookings);

  const showDayBookings = async (day) => {
    const localDate = day.toLocaleDateString("en-US");
    console.log(localDate);
    const dayBooks = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/book?date=${localDate}`
        : `http://localhost:3001/book?date=${localDate}`
    );
    const bookings = await dayBooks.json();
    setDayBookings(bookings);
  };

  const getBookings = async () => {
    const books = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/book`
        : `http://localhost:3001/book`
    );
    const bookings = await books.json();
    const dates = bookings.map((book) => book.dates).flat();
    setBookings(dates);
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <Head>
        <title>Guanaco Admin</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <main className={s.main}>
        <h1>Panel de Administrador</h1>
        <nav>
          <ul>
            <Link href="/admin/orders">
              <li>
                <a className={s.link}>Pedidos</a>
              </li>
            </Link>
            <Link href="/admin/users">
              <li>
                <a className={s.link}>Usuarios</a>
              </li>
            </Link>
            <Link href="/admin/equipment">
              <li>
                <a className={s.link}>Equipos</a>
              </li>
            </Link>
          </ul>
        </nav>
        <section>
          <Calendar
            className={s.calendar}
            // onChange={setDateRange}
            // value={dateRange}
            // selectRange={true}
            onClickDay={showDayBookings}
            locale="es-ES"
            minDate={new Date()}
            tileClassName={({ date, view }) => {
              if (
                bookings.find(
                  (day) => new Date(day).getTime() === date.getTime()
                )
              ) {
                return s.booked_tile;
              } else {
                if (new Date().getTime() <= date.getTime()) {
                  return s.free_tile;
                }
              }
            }}
          />
          <div className={s.info}>
            {dayBookings.length > 0 &&
              dayBookings.map((book) => (
                <div key={book.id}>
                  <p>N° {book.order.number}</p>
                  <p>Total: {formatPrice(book.order.totalPrice)}</p>
                  <div>
                    <p>Fechas:</p>
                    {book.dates.map((date) => (
                      <p key={date}>{new Date(date).toLocaleDateString()}</p>
                    ))}
                  </div>
                  <div>
                    <p>Equipos:</p>
                    {book.order.equipments.map((gear) => (
                      <p key={gear.id}>
                        {gear.name} {gear.brand} {gear.model}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  const user = await getUniqueUser(session?.user.email);

  if (!session || user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { session },
  };
}
