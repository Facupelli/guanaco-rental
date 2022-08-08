import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setDate } from "../redux/features/pickupDate/pickupDateSlice";
import { generateAllDates } from "../utils/generate_all_dates";
import Bookeable from "../components/Bookeable/Bookeable";
import Nav from "../components/Nav/Nav";
import CartModal from "../components/CartModal/CartModal";
import CalendarComponent from "../components/Bookeable/EquipmentFilters/Calendar/Calendar";

import styles from "../styles/Home.module.scss";
import { getOrCreateUser } from "../utils/fetch_users";
import { setUserId } from "../redux/features/user/userSlice";

export default function Home({ equipment }) {
  const [showCart, setShowCart] = useState(false);

  const [datePickup, setDatePickup] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();

  // console.log("USER", user);

  useEffect(() => {
    if (user) {
      getOrCreateUser(user).then((res) => dispatch(setUserId(res.id)));
    }
  }, [user]);

  useEffect(() => {
    if (dateRange) {
      const allDates = generateAllDates(dateRange);

      dispatch(setDate(allDates));
    }
  }, [dateRange]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Guanaco Rental</title>
        <meta
          name="description"
          content="Guanaco rental website, book filming equipment online. San Juan, Argentina."
        />
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>

      {datePickup && (
        <CalendarComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
          setDatePickup={setDatePickup}
        />
      )}
      {showCart && (
        <CartModal
          setShowCart={setShowCart}
          setDatePickup={setDatePickup}
          dateRange={dateRange}
        />
      )}
      <Nav setShowCart={setShowCart} />
      <Bookeable dateRange={dateRange} setDatePickup={setDatePickup} />

      <main className={styles.main}></main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const equipment = await fetch("http://localhost:3001/equipment").then(
    (response) => response.json()
  );

  return {
    props: {
      equipment,
    },
  };
};
