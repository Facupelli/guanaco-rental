import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDate,
  setDate,
} from "../../redux/features/pickupDate/pickupDateSlice";
import { cleanCart } from "../../redux/features/cart/cartSlice";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useSetCartTotal } from "../../hooks/useSetCartTotal";

import { formatPrice } from "../../utils/price";
import {
  areAllItemsAvailable,
  generateAllDates,
} from "../../utils/dates_functions";

//COMPONENTS
import Nav from "../../components/Nav/Nav";
import CalendarComponent from "../../components/Bookeable/EquipmentFilters/Calendar/Calendar";
import MessageModal from "../../components/MessageModal/MessageModal";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import CartPageList from "../../components/CartPageList/CartPageList";
import AddCoupon from "../../components/AddCoupon/AddCoupon";
import CartSubTotal from "../../components/CartSubTotal/CartSubTotal";
import NavButton from "../../components/Nav/NavButton/NavButton";

import s from "../../styles/CartPage.module.scss";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const userData = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date.date_range);
  const pickupHour = useSelector((state) => state.date.pickup_hour);

  const [freeOrder, setFreeOrder] = useState(false);

  const [showModal, setShowModal] = useState({
    modal: false,
    loading: false,
    error: "",
  });

  const [couponApplied, setCouponApplied] = useState({
    success: false,
    coupon: {},
    error: "",
  });

  const [datePickup, setDatePickup] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const { totalCartPrice } = useSetCartTotal(couponApplied);

  const handleSelectDateRange = () => {
    setDatePickup(true);
  };

  useEffect(() => {
    if (dateRange) {
      const allDates = generateAllDates(dateRange);
      dispatch(setDate(allDates));
    }
  }, [dateRange, dispatch]);

  const handleClickBookOrder = async () => {
    if (!userData) {
      //registrate
      signIn();
      return;
    }
    if (!userData.phone && !userData.dniNumber) {
      //completa alta de cliente
      router.push("/newClient");
      return;
    }
    if (!userData.customerApproved) {
      //alta de cliente no aprobada
      setShowModal(true);
      return;
    }

    setShowModal((prev) => ({ ...prev, loading: true }));

    const data = JSON.stringify({
      cart,
      dates: date,
      pickupHour,
      totalPrice: freeOrder ? 0 : totalCartPrice.total,
      userId: userData.id,
      couponId: couponApplied?.success ? couponApplied.coupon.id : undefined,
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
      .catch((e) =>
        setShowModal((prev) => ({
          ...prev,
          eror: "error, vuelve a intentarlo",
        }))
      );

    if (newOrder && newOrder.message === "success") {
      router.push(`/newOrder/success?id=${newOrder.newOrder.id}`);
      dispatch(resetDate());
      dispatch(cleanCart());
      return;
    }
  };

  return (
    <div>
      <Head>
        <title>Guanaco Carrito</title>
        <meta
          name="description"
          content="Guanaco rental website, book filming equipment online. San Juan, Argentina."
        />
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav cartPage>
        <li>
          <NavButton
            name="CARRITO"
            icon={faCartShopping}
          />
        </li>
      </Nav>
      {datePickup && (
        <CalendarComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
          setDatePickup={setDatePickup}
        />
      )}
      {showModal.modal && (
        <MessageModal
          showButton
          btnFunc={() =>
            setShowModal((prev) => ({
              ...prev,
              modal: false,
            }))
          }
        >
          Tu alta de cliente todavía no fue aprobada, recuerda que puede demorar
          hasta 48hs.
        </MessageModal>
      )}
      {showModal.loading && (
        <LoadingModal>
          <p>Procesando...</p>
        </LoadingModal>
      )}
      {showModal.error && (
        <MessageModal
          showButton
          btnFunc={() =>
            setShowModal((prev) => ({
              ...prev,
              eror: "",
            }))
          }
        >
          <p>{showModal.error}</p>
        </MessageModal>
      )}
      <main className={s.main}>
        <CartPageList cart={cart} date={date} />
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
                totalCartPrice.total > 0 &&
                areAllItemsAvailable(cart, date)
                  ? false
                  : true
              }
              onClick={handleClickBookOrder}
            >
              agendar pedido
            </button>
            <Link href="/book">
              <button type="button">continuar alquilando</button>
            </Link>
          </div>
          {userData && userData.role === "ADMIN" && (
            <div className={s.free_order_wrapper}>
              <label>Alquilar gratis porque soy el dueño del rental:</label>
              <input
                type="checkbox"
                onClick={(e) => {
                  console.log(e.target.checked);
                  setFreeOrder(e.target.checked);
                }}
              />
            </div>
          )}
          <div className={s.total_wrapper}>
            <CartSubTotal totalCartPrice={totalCartPrice} />
            <AddCoupon
              setCouponApplied={setCouponApplied}
              couponApplied={couponApplied}
            />
            <div className={`${s.total_price_wrapper} ${s.margin_1}`}>
              <p>Total:</p>
              <p className={s.p_bold}>
                {freeOrder || !date.length > 0
                  ? formatPrice(0)
                  : cart &&
                    cart.length > 0 &&
                    date.length > 0 &&
                    formatPrice(totalCartPrice.total)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
