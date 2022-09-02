import Head from "next/head";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/price_formater";
import {
  areAllItemsAvailable,
  generateAllDates,
} from "../../utils/dates_functions";
import {
  resetDate,
  setDate,
} from "../../redux/features/pickupDate/pickupDateSlice";
import { useRouter } from "next/router";
import { cleanCart } from "../../redux/features/cart/cartSlice";

//COMPONENTS
import CartPageItem from "../../components/CartPageItem/CartPageItem";
import Nav from "../../components/Nav/Nav";
import CalendarComponent from "../../components/Bookeable/EquipmentFilters/Calendar/Calendar";
import MessageModal from "../../components/MessageModal/MessageModal";
import LoadingModal from "../../components/LoadingModal/LoadingModal";

import s from "../../styles/CartPage.module.scss";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [freeOrder, setFreeOrder] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [datePickup, setDatePickup] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const userData = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date.date_range);
  const pickupHour = useSelector((state) => state.date.pickup_hour);

  const handleSelectDateRange = () => {
    setDatePickup(true);
  };

  useEffect(() => {
    if (dateRange) {
      const allDates = generateAllDates(dateRange);
      dispatch(setDate(allDates));
    }
  }, [dateRange, dispatch]);

  const getCartTotalPrice = () => {
    const getWorkingTotalDays = () => {
      let weekDay = 0;
      let weekendDay = 0;

      for (let day of date) {
        const newDay = new Date(day).getDay();
        if (newDay === 6 || newDay === 0) {
          weekendDay += 1;
        } else {
          if (new Date(day).getTime() === new Date(date[0]).getTime()) {
            newDay === 5 && pickupHour === "09:00" ? (weekDay += 0.5) : null;
            newDay === 5 && pickupHour === "20:00" ? (weekDay += 0) : null;
          } else {
            weekDay += 1;
          }
        }
      }
      return weekDay + weekendDay / 2;
    };

    const workingDays = getWorkingTotalDays();

    const totalPrice = cart.reduce((curr, acc) => {
      return curr + (acc.quantity ? acc.price * acc.quantity : acc.price);
    }, 0);

    return totalPrice * workingDays;
  };

  const handleClickBookOrder = async () => {
    if (!userData) {
      //registrate
      signIn()
      return;
    }
    if (!userData.phone && !userData.dniNumber) {
      //completa alta de cliente
      router.push("/newClient");
      return;
    }
    if (!userData.customerApproved) {
      //alta de cliente no aprobada
      return;
    }

    setLoading(true);

    const totalPrice = getCartTotalPrice();

    const data = JSON.stringify({
      cart,
      dates: date,
      pickupHour,
      totalPrice: freeOrder ? 0 : totalPrice,
      userId: userData.id,
    });

    const newOrder = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/order`
        : "http://localhost:3001/order",
      {
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((e) => setError("error, vuelve a intentarlo", e));

    if (newOrder && newOrder.message === "success") {
      router.push(`/newOrder/success?id=${newOrder.newOrder.id}`);
      dispatch(resetDate());
      dispatch(cleanCart());
      setLoading(false);
      return;
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
      {loading && (
        <LoadingModal>
          <p>Procesando...</p>
        </LoadingModal>
      )}
      {error && (
        <MessageModal showButton btnFunc={() => setError("")}>
          <p>{error}</p>
        </MessageModal>
      )}
      <main className={s.main}>
        <div>
          <div className={s.table_titles}>
            <p>Equipos</p>
            <p>Cantidad</p>
            <p>Precio</p>
          </div>
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <CartPageItem key={item.id} item={item} dates={date} />
            ))
          ) : (
            <p>No tiene equipos agregados al carrito!</p>
          )}
        </div>
        <div className={s.summary}>
          {date && date.length > 0 ? (
            <div className={s.date_range}>
              <div>
                <div>
                  <p>Retiro:</p>
                  <p className={s.p_bold}>
                    {date &&
                      date.length > 0 &&
                      new Date(date[0]).toLocaleDateString()}
                  </p>
                </div>
                <p className={s.p_bold}>{pickupHour} hs</p>
              </div>

              <div>
                <div>
                  <p>Devolución:</p>
                  <p className={s.p_bold}>
                    {date &&
                      date.length > 0 &&
                      new Date(date.at(-1)).toLocaleDateString()}
                  </p>
                </div>
                <p className={s.p_bold}>09:00 hs</p>
              </div>
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
              disabled={
                date.length > 0 &&
                cart.length > 0 &&
                getCartTotalPrice() > 0 &&
                areAllItemsAvailable(cart, date)
                  ? false
                  : true
              }
              onClick={handleClickBookOrder}
            >
              agendar pedido
            </button>
            <Link href="/">
              <button type="button">continuar alquilando</button>
            </Link>
          </div>
          {userData && userData.role === "ADMIN" && (
            <div className={s.free_order_wrapper}>
              <label>Alquilar gratis porque soy el dueño del rental:</label>
              <input
                type="checkbox"
                onClick={(e) => {
                  console.log(e.target.checked)
                  setFreeOrder(e.target.checked)}}
              />
            </div>
          )}
          <div className={s.total_price_wrapper}>
            <p>Total:</p>
            <p className={s.p_bold}>
              {freeOrder
                ? formatPrice(0)
                : cart && cart.length > 0 && formatPrice(getCartTotalPrice())}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
