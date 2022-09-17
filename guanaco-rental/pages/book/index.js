import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDateRange } from "../../hooks/useDateRange";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueUser } from "../../utils/fetch_users";
import { setUserId } from "../../redux/features/user/userSlice";
import { useSession } from "next-auth/react";

//COMPONENTS
import Bookeable from "../../components/Bookeable/Bookeable";
import Nav from "../../components/Nav/Nav";
import CartModal from "../../components/CartModal/CartModal";
import CalendarComponent from "../../components/Bookeable/EquipmentFilters/Calendar/Calendar";
import Footer from "../../components/Home/Footer/Footer";
import MessageModal from "../../components/MessageModal/MessageModal";
import NavButton from "../../components/Nav/NavButton/NavButton";

import s from "../../styles/BookPage.module.scss";

export default function Home({ showNewClientModal }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(showNewClientModal);
  const [showCart, setShowCart] = useState(false);

  const [datePickup, setDatePickup] = useState(false);
  const { dateRange, setDateRange } = useDateRange();

  const userData = useSelector((state) => state.user.data);
  const { data: session } = useSession();

  useEffect(() => {
    if (!userData && session) {
      getUniqueUser(session.user.email).then((res) => dispatch(setUserId(res)));
    }
  }, [userData, session]);

  return (
    <div className={s.container}>
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
        <link
          rel="dns-prefetch"
          href="https://www.googletagmanager.com/gtag/"
        />
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

      <Nav setShowCart={setShowCart}>
        <li>
          <NavButton
            name="CARRITO"
            icon={faCartShopping}
            handleOnClick={() => setShowCart(true)}
          />
        </li>
      </Nav>

      {showModal && (
        <MessageModal btnFunc={() => setShowModal(false)}>
          <p className={s.bold}>IMPORTANTE</p>
          <p>
            Para poder alquilar equipos es necesario llenar el formulario de
            alta de cliente. Una vez aprobado (puede demorar hasta 48hs) podrás
            realizar tus reservas a través de la web.
          </p>
          <div className={s.modal_links}>
            <Link href="/newClient">
              <a>IR AL ALTA</a>
            </Link>
            <button type="button" onClick={() => setShowModal(false)}>
              CERRAR
            </button>
          </div>
        </MessageModal>
      )}

      <main className={s.main}>
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
      <Footer />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (session?.user.role === "ADMIN" || session?.user.role === "EMPLOYEE") {
    return {
      props: {
        session,
      },
    };
  }

  if (session?.user.petitionSent === "DENIED") {
    return {
      props: {
        showNewClientModal: true,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
