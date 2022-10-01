import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import {
  resetDate,
  setPickupHour,
} from "../../redux/features/pickupDate/pickupDateSlice";
import { cleanCart, setCart } from "../../redux/features/cart/cartSlice";
import { setUserId } from "../../redux/features/user/userSlice";
import {
  setLocation,
  setShowModal,
} from "../../redux/features/location/locationSlice";

import { useSumCartItems } from "../../hooks/useSumCartItems";
import { useCartTotal } from "../../hooks/useCartTotal";
import { useDateRange } from "../../hooks/useDateRange";

import { formatPrice } from "../../utils/price";
import { areAllItemsAvailable } from "../../utils/dates_functions";
import { getUniqueUser } from "../../utils/fetch_users";

//COMPONENTS
import Nav from "../../components/Nav/Nav";
import CalendarComponent from "../../components/Bookeable/EquipmentFilters/Calendar/Calendar";
import MessageModal from "../../components/MessageModal/MessageModal";
import LoadingModal from "../../components/LoadingModal/LoadingModal";
import CartPageList from "../../components/CartPageList/CartPageList";
import AddCoupon from "../../components/AddCoupon/AddCoupon";
import NavButton from "../../components/Nav/NavButton/NavButton";
import CartSubTotal from "../../components/CartPageList/CartSubTotal/CartSubTotal";
import Loader from "../../components/Loaders/Loader/Loader";

import s from "../../styles/CartPage.module.scss";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session } = useSession();

  const userData = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date.date_range);
  const pickupHour = useSelector((state) => state.date.pickup_hour);
  const location = useSelector((state) => state.location.city);

  useEffect(() => {
    if (!userData && session) {
      getUniqueUser(session.user.email).then((res) => dispatch(setUserId(res)));
    }
  }, [userData, session, dispatch]);

  useEffect(() => {
    if (cart?.length === 0) {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        dispatch(setCart(JSON.parse(localCart)));
      }
    }
  }, [dispatch, cart?.length]);

  useEffect(() => {
    if (!pickupHour) {
      dispatch(setPickupHour("09:00hs"));
    }
  }, [location, dispatch, pickupHour]);

  useEffect(() => {
    if (!location) {
      const localLocation = localStorage.getItem("location");
      if (localLocation) {
        dispatch(setLocation(localLocation));
      } else {
        dispatch(setShowModal(true));
      }
    }
  }, [dispatch]);

  const [freeOrder, setFreeOrder] = useState(false);

  const [showMessageModal, setShowMessageModal] = useState({
    modal: false,
    loading: false,
    error: "",
  });

  const [couponApplied, setCouponApplied] = useState({
    success: false,
    coupon: {},
    error: "",
    loading: false,
  });

  const [datePickup, setDatePickup] = useState(false);
  const { dateRange, setDateRange } = useDateRange();

  const { totalCartPrice } = useSumCartItems();

  const { totalCartDefinitive } = useCartTotal(
    totalCartPrice,
    date,
    userData.orders,
    couponApplied
  );

  const handleSelectDateRange = () => {
    setDatePickup(true);
  };

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
      setShowMessageModal((prev) => ({
        ...prev,
        modal: true,
      }));
      return;
    }

    setShowMessageModal((prev) => ({ ...prev, loading: true }));

    const data = JSON.stringify({
      cart,
      dates: date,
      pickupHour,
      totalPrice: freeOrder ? 0 : totalCartDefinitive.total,
      userId: userData.id,
      couponId: couponApplied?.success ? couponApplied.coupon.id : undefined,
      location,
    });

    const newOrder = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/order`
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
      .catch((e) => {
        setShowMessageModal((prev) => ({
          ...prev,
          error: "error, vuelve a intentarlo",
          loading: false,
        }));
      });

    if (newOrder?.error) {
      setShowMessageModal((prev) => ({
        ...prev,
        error: `error: ${newOrder.message}`,
        loading: false,
      }));
    }

    if (newOrder && newOrder.message === "success") {
      router.push(`/newOrder/success?id=${newOrder.newOrder.id}`);
      dispatch(resetDate());
      dispatch(cleanCart());
      localStorage.removeItem("cart");
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
          <NavButton name="CARRITO" icon={faCartShopping} />
        </li>
      </Nav>
      {datePickup && (
        <CalendarComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
          setDatePickup={setDatePickup}
        />
      )}
      {showMessageModal.modal && (
        <MessageModal
          showButton
          btnFunc={() =>
            setShowMessageModal((prev) => ({
              ...prev,
              modal: false,
            }))
          }
        >
          Tu alta de cliente todavía no fue aprobada, recuerda que puede demorar
          hasta 48hs.
        </MessageModal>
      )}
      {showMessageModal.loading && (
        <LoadingModal>
          <div className={s.processing_flex}>
            Procesando <Loader />
          </div>
        </LoadingModal>
      )}
      {showMessageModal.error && (
        <MessageModal
          showButton
          btnFunc={() =>
            setShowMessageModal((prev) => ({
              ...prev,
              error: "",
            }))
          }
        >
          <p>{showMessageModal.error}</p>
        </MessageModal>
      )}
      <main className={s.main}>
        <CartPageList cart={cart} date={date} />
        <div className={s.summary}>
          {date && date.length > 0 ? (
            <div className={s.date_range} onClick={handleSelectDateRange}>
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
                totalCartPrice > 0 &&
                location &&
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
          {session && session?.user.role === "ADMIN" && (
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
            <CartSubTotal totalCartPrice={totalCartDefinitive} />
            <AddCoupon
              setCouponApplied={setCouponApplied}
              couponApplied={couponApplied}
              location={location}
            />
            <div className={s.guanaco_branch}>
              <p>Sucursal:</p>
              <p>
                <strong>
                  {location === "MENDOZA" ? "Mendoza" : "San Juan"}
                </strong>
              </p>
            </div>
            <div className={`${s.total_price_wrapper} ${s.margin_1}`}>
              <p>Total:</p>
              <p className={s.p_bold}>
                {freeOrder || !date.length > 0
                  ? formatPrice(0)
                  : cart &&
                    cart.length > 0 &&
                    date.length > 0 &&
                    formatPrice(totalCartDefinitive.total)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
