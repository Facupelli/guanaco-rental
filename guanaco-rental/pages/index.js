import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { setDate } from "../redux/features/pickupDate/pickupDateSlice";
import { generateAllDates } from "../utils/dates_functions";
import { getOrCreateUser } from "../utils/fetch_users";
import { setUserId } from "../redux/features/user/userSlice";

//COMPONENTS
import Bookeable from "../components/Bookeable/Bookeable";
import Nav from "../components/Nav/Nav";
import CartModal from "../components/CartModal/CartModal";
import CalendarComponent from "../components/Bookeable/EquipmentFilters/Calendar/Calendar";

import styles from "../styles/Home.module.scss";
import useOnClickOutside from "../hooks/useOnClickOutside";

export default function Home() {
  const userData = useSelector((state) => state.user.data);

  const [showCart, setShowCart] = useState(false);

  const [datePickup, setDatePickup] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();

  // console.log("auth0 user", user);

  useEffect(() => {
    if (user) {
      if (!userData) {
        getOrCreateUser(user).then((res) => dispatch(setUserId(res)));
      }
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

// export const getServerSideProps = async () => {
//   const equipment = await fetch("http://localhost:3001/equipment").then(
//     (response) => response.json()
//   );

//   return {
//     props: {
//       equipment,
//     },
//   };
// };
