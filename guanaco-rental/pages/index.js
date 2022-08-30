import Head from "next/head";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setDate } from "../redux/features/pickupDate/pickupDateSlice";
import { generateAllDates } from "../utils/dates_functions";
import { getOrCreateUser, getUniqueUser } from "../utils/fetch_users";
import { setUserId } from "../redux/features/user/userSlice";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

//COMPONENTS
import Bookeable from "../components/Bookeable/Bookeable";
import Nav from "../components/Nav/Nav";
import CartModal from "../components/CartModal/CartModal";
import CalendarComponent from "../components/Bookeable/EquipmentFilters/Calendar/Calendar";

import styles from "../styles/Home.module.scss";

export default function Home() {
  const userData = useSelector((state) => state.user.data);

  const [showCart, setShowCart] = useState(false);

  const [datePickup, setDatePickup] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const dispatch = useDispatch();

  const { data: session } = useSession();

  console.log("NEXT AUTH", session);

  useEffect(() => {
    if (session?.user) {
      if (!userData) {
        console.log("ENTRE");
        getOrCreateUser(session.user).then((res) => dispatch(setUserId(res)));
      }
    }
  }, [session, userData, dispatch]);

  useEffect(() => {
    if (dateRange) {
      const allDates = generateAllDates(dateRange);

      dispatch(setDate(allDates));
    }
  }, [dateRange, dispatch]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Guanaco Rental</title>
        <meta
          name="description"
          content="Guanaco rental web, alquiler de equipos para cine online. San Juan, Argentina."
        />
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>

      <Nav setShowCart={setShowCart} home />

      <main className={styles.main}>
        {datePickup && (
          <CalendarComponent
            dateRange={dateRange}
            setDateRange={setDateRange}
            setDatePickup={setDatePickup}
          />
        )}
        <CartModal
          setShowCart={setShowCart}
          setDatePickup={setDatePickup}
          showCart={showCart}
        />
        <Bookeable
          dateRange={dateRange}
          setDatePickup={setDatePickup}
          setShowCart={setShowCart}
        />
      </main>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  let user;
  if (session) {
    user = await getUniqueUser(session?.user.email);
  }

  if (user && !user.petitionSent) {
    return {
      redirect: {
        destination: "/newClient",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
