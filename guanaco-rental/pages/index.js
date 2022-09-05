import Head from "next/head";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setDate } from "../redux/features/pickupDate/pickupDateSlice";
import { generateAllDates } from "../utils/dates_functions";
import { getOrCreateUser } from "../utils/fetch_users";
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

  // console.log("NEXT AUTH", session);

  useEffect(() => {
    if (session?.user && !userData) {
      getOrCreateUser(session.user).then((res) => dispatch(setUserId(res)));
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
          content="Guanaco rental web, alquiler de equipos para cine y fotografía. San Juan, Argentina."
        />
        <link rel="icon" href="/logo-favicon.ico" />
        <link
          rel="preconnect"
          href="https://guanaco-rental-production.up.railway.app"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </Head>

      <Script
        id="ga-script"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="ga-script2"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
            gtag('set', 'transport', 'beacon');
            gtag('send', 'pageview');
            gtag('js', new Date());
          `,
        }}
      />

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
    const response = await getOrCreateUser(session.user);
    user = response.user;
  }

  if (user && (user.petitionSent === "DENIED" || !user.petitionSent)) {
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
