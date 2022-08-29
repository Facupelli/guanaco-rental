import Link from "next/link";
import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import CartItem from "./CartItem/CartItem";

import s from "./CartModal.module.scss";

export default function CartModal({ showCart, setShowCart, setDatePickup }) {
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date.date_range);

  const cartModalRef = useRef(null);

  useOnClickOutside(
    cartModalRef,
    useCallback(() => setShowCart(false),[setShowCart])
  );

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleSelectDateRange = () => {
    setDatePickup(true);
  };

  return (
    <aside
      className={`${s.cart_container} ${showCart ? s.show : s.hide}`}
      ref={cartModalRef}
    >
      <div className={s.cart_headline}>
        <h1>MI PEDIDO</h1>
        <button type="button" onClick={handleCloseCart}>
          X
        </button>
      </div>
      {date.length > 0 ? (
        <div className={s.date_range}>
          <p>{new Date(date[0]).toLocaleDateString()}</p>
          <p>{"->"}</p>
          <p>{new Date(date.at(-1)).toLocaleDateString()}</p>
        </div>
      ) : (
        <button className={s.select_date_btn} onClick={handleSelectDateRange}>
          seleccionar fecha de alquiler
        </button>
      )}
      <div className={s.cart_list}>
        {cart && cart.length > 0 ? (
          cart.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <p>Tu carrito esta vacio.</p>
        )}
      </div>
      {/* <button type="button" onClick={handleCloseCart}>
        seguir alquilando
      </button> */}
      <div className={s.next_btn_wrapper}>
        <Link href="/cart">
          <button type="button">VER CARRITO</button>
        </Link>
        <button type="button">ALQUILAR</button>
      </div>
    </aside>
  );
}
