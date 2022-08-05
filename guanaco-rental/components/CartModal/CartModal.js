import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";

import s from "./CartModal.module.scss";

export default function CartModal({ setShowCart }) {
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date.date_range);

  const handleCloseCart = () => {
    setShowCart(false);
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
          <p>{date[0]}</p>
          <p>{"->"}</p>
          <p>{date[date.length - 1]}</p>
        </div>
      ) : (
        <button className={s.select_date_btn}>seleccionar fecha de alquiler</button>
      )}
      {cart && cart.length > 0 && cart.map((item) => <CartItem item={item} />)}
      <button type="button" onClick={handleCloseCart}>
        seguir alquilando
      </button>
    </aside>
  );
}
