import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDate,
  setDate,
} from "../../redux/features/pickupDate/pickupDateSlice";
import { cleanCart } from "../../redux/features/cart/cartSlice";

import { useSetCartTotal } from "../../hooks/useSetCartTotal";

import { formatPrice } from "../../utils/price";
import {
  areAllItemsAvailable,
  generateAllDates,
} from "../../utils/dates_functions";
import { handleApplyCoupon } from "../../utils/coupons";

//COMPONENTS
import Nav from "../../components/Nav/Nav";
import CalendarComponent from "../../components/Bookeable/EquipmentFilters/Calendar/Calendar";
import MessageModal from "../../components/MessageModal/MessageModal";
import LoadingModal from "../../components/LoadingModal/LoadingModal";

import s from "../../styles/CartPage.module.scss";
import CartPageList from "../../components/CartPageList/CartPageList";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const userData = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date.date_range);
  const pickupHour = useSelector((state) => state.date.pickup_hour);

  const [freeOrder, setFreeOrder] = useState(false);
  const [couponName, setCoupon] = useState("");

  const [showModal, setShowModal] = useState({
    modal: false,
    question: false,
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
      <Nav cartPage />
      {datePickup && (
        <CalendarComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
          setDatePickup={setDatePickup}
        />
      )}
      {showModal.question && (
        <MessageModal
          showButton
          btnFunc={() =>
            setShowModal((prev) => ({
              ...prev,
              question: false,
            }))
          }
          btnName="CERRAR"
        >
          <p>
            A los pedidos que superen los $40.000 o que se alquilen por más de 3
            días se les aplica un descuento de 10%.
          </p>
          <p>
            A nuestros clientes frecuentes con más de 10 pedidos realizados, si
            el pedido supera los $15.000 se le aplica un descento de 10%.
          </p>
          <p>Si tienes un cupón los descuentos NO son acumulativos.</p>
        </MessageModal>
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
            {totalCartPrice.discount && (
              <>
                <div className={`${s.total_price_wrapper} ${s.font_small}`}>
                  <p>Sub Total:</p>
                  <p>{formatPrice(totalCartPrice.originalTotal)}</p>
                </div>
                <div className={`${s.total_price_wrapper} ${s.font_small}`}>
                  <p>
                    Descuento:{" "}
                    <FontAwesomeIcon
                      icon={faCircleQuestion}
                      className={s.question_icon}
                      onClick={() =>
                        setShowModal((prev) => ({ ...prev, question: true }))
                      }
                    />
                  </p>
                  <p>{totalCartPrice.discount}</p>
                </div>
              </>
            )}
            <div className={s.coupon}>
              <details>
                <summary>Ingresar un cupón de descuento</summary>
                <div>
                  <input
                    type="text"
                    placeholder="ingresar código"
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyCoupon(couponName, setCouponApplied)
                    }
                  >
                    APLICAR
                  </button>
                </div>
                {couponApplied.error && <p>{couponApplied.error}</p>}
              </details>
            </div>
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
