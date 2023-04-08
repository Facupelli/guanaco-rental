import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueUser } from "../../utils/fetch_users";

//REDUX
import { setUserId } from "../../redux/features/user/userSlice";
import { setLocation } from "../../redux/features/location/locationSlice";

//HOOKS
import { useDateRange } from "../../hooks/useDateRange";
import {
  useLoadCartFromLocalStorage,
  useLoadLocationFromLocalStorage,
} from "../../hooks/useLocalStorage";

//COMPONENTS
import Bookeable from "../../components/Bookeable/Bookeable";
import Nav from "../../components/Nav/Nav";
import CartModal from "../../components/CartModal/CartModal";
import CalendarComponent from "../../components/Bookeable/EquipmentFilters/Calendar/Calendar";
import Footer from "../../components/Home/Footer/Footer";
import MessageModal from "../../components/MessageModal/MessageModal";
import NavButton from "../../components/Nav/NavButton/NavButton";
import SelectLoaction from "../../components/SelectLocation/SelectLocation";

import s from "../../styles/BookPage.module.scss";

export default function Home({ showNewModal }) {
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);
  const [showNewClientModal, setShowNewClientModal] = useState(showNewModal);

  const showLocationModal = useSelector((state) => state.location.showModal);
  const location = useSelector((state) => state.location.city);

  const [datePickup, setDatePickup] = useState(false);
  const { dateRange, setDateRange } = useDateRange();

  const userData = useSelector((state) => state.user.data);
  const { data: session } = useSession();

  useEffect(() => {
    if (!userData && session) {
      getUniqueUser(session.user.email).then((res) => dispatch(setUserId(res)));
    }
  }, [userData, session, dispatch]);

  useLoadCartFromLocalStorage();
  useLoadLocationFromLocalStorage();

  useEffect(() => {
    if (
      (session?.user.role === "ADMIN" || session?.user.role === "EMPLOYEE") &&
      location === "all"
    ) {
      dispatch(setLocation("SAN_JUAN"));
    }
  }, [dispatch, session?.user.role, location]);

  return (
    <div className={s.container}>
      <Head>
        <title>Guanaco Rental</title>
        <meta
          name="description"
          content="Guanaco Rental, alquiler de equipos para cine y fotografía. San Juan, Argentina."
        />
        <meta property="og:title" content="Guanaco Rental" />
        <meta
          property="og:description"
          content="Aquiler de equipos para cine y fotografía."
        />
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>

      <Nav setShowCart={setShowCart} route="book">
        <li>
          <NavButton
            name="CARRITO"
            icon={faCartShopping}
            handleOnClick={() => setShowCart(true)}
          />
        </li>
      </Nav>

      {showLocationModal && (
        <MessageModal btnFunc={() => {}}>
          <h3 className={s.location_modal_title}>¿DONDE QUERÉS ALQUILAR?</h3>
          <SelectLoaction />
        </MessageModal>
      )}

      {showNewClientModal && (
        <MessageModal btnFunc={() => setShowNewClientModal(false)}>
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
            <button type="button" onClick={() => setShowNewClientModal(false)}>
              YA TENGO UNA CUENTA / SOLO QUIERO VER
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

  if (session?.user.petitionSent === "DENIED" || !session?.user.petitionSent) {
    return {
      props: {
        showNewModal: true,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
