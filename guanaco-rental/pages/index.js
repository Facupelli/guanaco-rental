import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { useEffect, useState } from "react";
import Bookeable from "../components/Bookeable/Bookeable";
import Nav from "../components/Nav/Nav";
import CartModal from "../components/CartModal/CartModal";
import CalendarComponent from "../components/Bookeable/EquipmentFilters/Calendar/Calendar";

import styles from "../styles/Home.module.scss";
import { setDate } from "../redux/features/pickupDate/pickupDateSlice";

export default function Home({ equipment }) {
  const [showCart, setShowCart] = useState(false);

  const [datePickup, setDatePickup] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();

  // console.log("USER", user);

  useEffect(() => {
    if (dateRange) {
      const dates = dateRange.map((date) => date.toLocaleDateString("es-EN"));
      console.log(dates);
      const allDates = [];

      const pickup_month = Number(dates[0].split("/")[1]);
      const return_month = Number(dates[1].split("/")[1]);
      const pickup_day = Number(dates[0].split("/")[0]);
      const return_day = Number(dates[1].split("/")[0]);

      const getAllDates = () => {
        const days = 0;
        if (pickup_month === return_month) {
          for (let i = pickup_day; i <= return_day; i++) {
            days += 1;
            allDates.push(`${pickup_month}/${i}/${dates[0].split("/")[2]}`);
            console.log(allDates);
          }
        }
        if (pickup_month < return_month) {
          for (
            let i = pickup_day;
            i <= calendar_dictionary[String(pickup_month)];
            i++
          ) {
            days += 1;
            allDates.push(`${pickup_month}/${i}/${dates[0].split("/")[2]}`);
          }
          for (let i = 1; i <= return_day; i++) {
            days += 1;
            allDates.push(`${return_month}/${i}/${dates[1].split("/")[2]}`);
          }
        }
        return days;
      };
      getAllDates();

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {datePickup && (
        <CalendarComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
          setDatePickup={setDatePickup}
        />
      )}
      {showCart && (
        <CartModal setShowCart={setShowCart} setDatePickup={setDatePickup} dateRange={dateRange} />
      )}
      <Nav setShowCart={setShowCart} />
      <Bookeable
        dateRange={dateRange}
        setDatePickup={setDatePickup}
      />

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
