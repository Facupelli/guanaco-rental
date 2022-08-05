import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";

import s from "./CartModal.module.scss";

export default function CartModal({ setShowCart, setDatePickup, dateRange }) {
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date.date_range);

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
          <p>{dateRange[0].toLocaleDateString()}</p>
          <p>{"->"}</p>
          <p>{dateRange[1].toLocaleDateString()}</p>
        </div>
      ) : (
        <button className={s.select_date_btn} onClick={handleSelectDateRange}>
          seleccionar fecha de alquiler
        </button>
      )}
      {cart && cart.length > 0 && cart.map((item) => <CartItem item={item} />)}
      <button type="button" onClick={handleCloseCart}>
        seguir alquilando
      </button>
      <div className={s.next_btn_wrapper}>
        <button type="button">VER CARRITO</button>
        <button type="button">ALQUILAR</button>
      </div>
    </aside>
  );
}
