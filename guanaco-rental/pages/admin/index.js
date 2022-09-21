import Head from "next/head";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useCallback, useEffect, useState } from "react";
import { formatPrice } from "../../utils/price";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueUser } from "../../utils/fetch_users";
import { setUserId } from "../../redux/features/user/userSlice";

import Nav from "../../components/Nav/Nav";
import Calendar from "react-calendar";
import AdminNav from "../../components/AdminNav/AdminNav";

import s from "../../styles/AdminPage.module.scss";

export default function AdminPage() {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    if (!userData && session) {
      getUniqueUser(session.user.email).then((res) => dispatch(setUserId(res)));
    }
  }, [userData, session, dispatch]);

  const employeeLocation = useSelector(
    (state) => state.user.data.addressProvince
  );

  const [bookings, setBookings] = useState([]);
  const [dayBookings, setDayBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const showDayBookings = async (day) => {
    setLoading(true);
    const localDate = day.toLocaleDateString("en-US");
    try {
      const dayBooks = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://guanaco-rental-production.up.railway.app/book?date=${localDate}&location=${
              session?.user.role === "EMPLOYEE" ? employeeLocation : "all"
            }`
          : `http://localhost:3001/book?date=${localDate}&location=${
              session?.user.role === "EMPLOYEE" ? employeeLocation : "all"
            }`
      );
      const bookings = await dayBooks.json();
      setDayBookings(bookings);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const getBookings = useCallback(async () => {
    try {
      const books = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://guanaco-rental-production.up.railway.app/book?location=${
              session?.user.role === "EMPLOYEE" ? employeeLocation : "all"
            }`
          : `http://localhost:3001/book?location=${
              session?.user.role === "EMPLOYEE" ? employeeLocation : "all"
            }`
      );
      const bookings = await books.json();
      const dates = bookings.map((book) => book.dates).flat();
      setBookings(dates);
    } catch (e) {
      console.log(e);
    }
  }, [session?.user.role, employeeLocation]);

  useEffect(() => {
    if (userData && session) {
      getBookings();
    }
  }, [userData, session, getBookings]);

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Guanaco Admin</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <main className={s.main}>
        <h1>Panel de Administrador</h1>
        <AdminNav role={session?.user.role} />
        <section>
          <Calendar
            className={s.calendar}
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
          <div className={s.info_wrapper}>
            {loading ? (
              <p>Cargando...</p>
            ) : (
              dayBookings.length > 0 &&
              dayBookings.map((book) => (
                <div key={book.id}>
                  <p className={s.bold}>{book.order.user.fullName}</p>
                  <div>
                    <p className={s.flex_10}>
                      <span className={s.bold}>N°</span> {book.order.number}
                    </p>
                    <p className={s.flex_20}>
                      <span className={s.bold}>Total:</span>{" "}
                      {formatPrice(book.order.totalPrice)}
                    </p>
                    <div className={s.flex_10}>
                      <p className={s.bold}>Fechas:</p>
                      <p>{new Date(book.dates[0]).toLocaleDateString()}</p>
                      <p>{new Date(book.dates.at(-1)).toLocaleDateString()}</p>
                    </div>
                    <div className={s.flex_50}>
                      <p className={s.bold}>Equipos:</p>
                      {book.order.equipments.map((gear) => (
                        <p key={gear.id}>
                          {gear.name} {gear.brand} {gear.model}
                        </p>
                      ))}
                    </div>
                  </div>
                  <p className={s.location}>{book.order.location === "MENDOZA" ? "MDZ" : "SJ"}</p>
                </div>
              ))
            )}
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

  if (session?.user.role === "ADMIN" || session?.user.role === "EMPLOYEE") {
    return {
      props: { session },
    };
  }

  return {
    redirect: {
      destination: "/",
    },
  };
}
