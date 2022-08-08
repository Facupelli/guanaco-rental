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

export default function Home({ equipment }) {
  const [showCart, setShowCart] = useState(false);

  const [datePickup, setDatePickup] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();

  // console.log("USER", user);

  const getOrCreateUser = async () => {
    const data = JSON.stringify({ email: user.email });

    await fetch("http://localhost:3001/users", {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => console.log(res));
  };

  useEffect(() => {
    if (user) {
      getOrCreateUser(user.email);
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
