import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/price_formater";
import { generateAllDates } from "../../utils/generate_all_dates";
import { setDate } from "../../redux/features/pickupDate/pickupDateSlice";
import CartPageItem from "../../components/CartPageItem/CartPageItem";
import Nav from "../../components/Nav/Nav";
import CalendarComponent from "../../components/Bookeable/EquipmentFilters/Calendar/Calendar";

import s from "../../styles/CartPage.module.scss";
import CompleteProfileModal from "../../components/CompleteProfileModal/CompleteProfileModal";

export default function CartPage() {
  const dispatch = useDispatch();

  const [showCompleteProfile, setShowCompleteProfile] = useState(false);

  const [datePickup, setDatePickup] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const userData = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date.date_range);

  const handleSelectDateRange = () => {
    setDatePickup(true);
  };

  useEffect(() => {
    if (dateRange) {
      const allDates = generateAllDates(dateRange);

      dispatch(setDate(allDates));
    }
  }, [dateRange]);

  const getTotalPrice = () => {
    const totalPrice = cart.reduce((curr, acc) => {
      return curr + (acc.quantity ? acc.price * acc.quantity : acc.price);
    }, 0);
    return formatPrice(totalPrice);
  };

  const handleClickBookOrder = () => {
    if (!userData.phone && !userData.dni.length > 0) {
      console.log("completa tu perfil");
      setShowCompleteProfile(true);
    }
  };

  return (
    <div>
      <Head>
        <title>Guanaco Cart</title>
        <meta
          name="description"
          content="Guanaco rental website, book filming equipment online. San Juan, Argentina."
        />
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav cartPage />
      {datePickup && (
        <CalendarComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
          setDatePickup={setDatePickup}
        />
      )}
      {showCompleteProfile && (
        <CompleteProfileModal
          user={userData}
          setShowCompleteProfile={setShowCompleteProfile}
        />
      )}
      <main className={s.main}>
        <div>
          <div className={s.table_titles}>
            <p>Equipos</p>
            <p>Cantidad</p>
            <p>Precio</p>
          </div>
          {cart &&
            cart.length > 0 &&
            cart.map((item) => <CartPageItem key={item.id} item={item} />)}
        </div>
        <div className={s.summary}>
          {date && date.length > 0 ? (
            <div className={s.date_range}>
              <p>Retiro:</p>
              <p>{date && date.length > 0 && date[0]}</p>
              <p>Devolución:</p>
              <p>{date && date.length > 0 && date[date.length - 1]}</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleSelectDateRange}
              className={s.select_date_btn}
            >
              Seleccionar Fecha de Alquiler
            </button>
          )}
          <div className={s.btns_wrapper}>
            <button
              type="button"
              disabled={date.length > 0 && cart.length > 0 ? false : true}
              onClick={handleClickBookOrder}
            >
              agendar pedido
            </button>
            <Link href="/">
              <button type="button">continuar alquilando</button>
            </Link>
          </div>
          <div className={s.total_price_wrapper}>
            <p>Total:</p>
            <p>{cart && cart.length > 0 && getTotalPrice()}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
