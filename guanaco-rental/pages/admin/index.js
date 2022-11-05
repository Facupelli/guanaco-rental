import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueUser } from "../../utils/fetch_users";
import { setUserId } from "../../redux/features/user/userSlice";

import Nav from "../../components/Nav/Nav";
import Calendar from "react-calendar";
import AdminMain from "../../components/AdminMain/AdminMain";
import Table from "../../components/Table/Table";
import OrderRow from "../../components/OrderRow/OrderRow";

import s from "../../styles/AdminPage.module.scss";

const trTitles = [
  "N°",
  "NOMBRE",
  "RETIRO",
  "DEVOLUCIÓN",
  "ESTADO",
  "TOTAL",
  "CITY",
];

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
    setDayBookings([]);
    setLoading(true);
    const localDate = day.toLocaleDateString("en-US");
    try {
      const dayBooks = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://www.guanacorental.shop/rentalapi/book?date=${localDate}&location=${"all"}`
          : `http://localhost:3001/book?date=${localDate}&location=${"all"}`
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
          ? `https://www.guanacorental.shop/rentalapi/book?location=${"all"}`
          : `http://localhost:3001/book?location=${"all"}`
      );
      const bookings = await books.json();

      const dates = bookings
        .map((book) => ({
          pickup: book.dates[0],
          return: book.dates[book.dates.length - 1],
        }))
        .flat();
      setBookings(dates);
    } catch (e) {
      console.log(e);
    }
  }, []);

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
        <AdminMain title="Calendario">
          <section>
            <Calendar
              className={s.calendar}
              onClickDay={showDayBookings}
              locale="es-ES"
              minDate={new Date()}
              tileClassName={({ date, view }) => {
                if (
                  bookings.find(
                    (day) => new Date(day.pickup).getTime() === date.getTime()
                  ) &&
                  bookings.find(
                    (day) => new Date(day.return).getTime() === date.getTime()
                  )
                ) {
                  return s.booked_pickup_return;
                } else if (
                  bookings.find(
                    (day) => new Date(day.pickup).getTime() === date.getTime()
                  )
                ) {
                  return s.booked_pickup;
                } else if (
                  bookings.find(
                    (day) => new Date(day.return).getTime() === date.getTime()
                  )
                ) {
                  return s.booked_return;
                } else {
                  if (new Date().getTime() <= date.getTime()) {
                    return s.free_tile;
                  }
                }
              }}
            />
            <div className={s.info_wrapper}>
              <div className={s.table_wrapper}>
                <Table trTitles={trTitles}>
                  {loading && (
                    <tr>
                      <td>Cargando...</td>
                    </tr>
                  )}
                  {dayBookings.length > 0 &&
                    dayBookings.map((book) => (
                      <OrderRow calendarTab key={book.id} order={book.order} />
                    ))}
                </Table>
              </div>
            </div>
          </section>
        </AdminMain>
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
