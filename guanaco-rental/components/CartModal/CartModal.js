import Link from "next/link";
import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";

import s from "./CartModal.module.scss";

export default function CartModal({ setShowCart, setDatePickup, dateRange }) {
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date.date_range);

  console.log("CARTMODAL, cart:", cart);

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleSelectDateRange = () => {
    setDatePickup(true);
  };

  return (
    <aside className={s.cart_container}>
      <div className={s.cart_headline}>
        <h1>MI PEDIDO</h1>
        <button type="button" onClick={handleCloseCart}>
          X
        </button>
      </div>
      {date.length > 0 ? (
        <div className={s.date_range}>
          {/* <p>{dateRange[0].toLocaleDateString()}</p> */}
          <p>{new Date(date[0]).toLocaleDateString()}</p>
          <p>{"->"}</p>
          <p>{new Date(date[date.length - 1]).toLocaleDateString()}</p>
          {/* <p>{dateRange[1].toLocaleDateString()}</p> */}
        </div>
      ) : (
        <button className={s.select_date_btn} onClick={handleSelectDateRange}>
          seleccionar fecha de alquiler
        </button>
      )}
      <div className={s.cart_list}>
        {cart &&
          cart.length > 0 &&
          cart.map((item) => <CartItem key={item.id} item={item} />)}
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
