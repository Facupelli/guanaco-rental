import ItemCounter from "../CartModal/CartItem/ItemCounter/ItemCounter";
import { formatPrice } from "../../utils/price_formater";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/features/cart/cartSlice";

import s from "./CartPageItem.module.scss";

export default function CartPageItem({ item, dates }) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const isAvailable =
    item.bookings.filter((book) => dates.indexOf(book.date) >= 0).length > 0
      ? false
      : true;

  return (
    <div className={s.item_container}>
      <div>
        <div className={s.item_title}>
          <p>{item.name}</p>
          <p>{item.brand}</p>
          <p>{item.model}</p>
        </div>
        <div className={s.availability_wrapper}>
          <p className={isAvailable ? `${s.green}` : `${s.red}`}>
            {isAvailable ? "Disponible" : "Reservado"}
          </p>
        </div>
      </div>
      <ItemCounter
        key={item.id}
        itemId={item.id}
        stock={item.stock}
        quantity={item.quantity}
      />
      <p>
        {item.quantity
          ? formatPrice(item.quantity * item.price)
          : formatPrice(item.price)}
      </p>
      <div className={s.btn_wrapper}>
        <button type="button" onClick={handleRemoveFromCart}>
          X
        </button>
      </div>
    </div>
  );
}
