import ItemCounter from "../CartModal/CartItem/ItemCounter/ItemCounter";
import { formatPrice } from "../../utils/price_formater";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/features/cart/cartSlice";
import { isAvailable } from "../../utils/dates_functions";

import s from "./CartPageItem.module.scss";
import XmarkButton from "../XmarkButton/XmarkButton";

export default function CartPageItem({ item, dates }) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const availability = isAvailable(dates, item);

  return (
    <div className={s.item_container}>
      <div>
        <div className={s.item_title}>
          <div className={s.name_flex}>
            <p>{item.name}</p>
            <p>{item.brand}</p>
          </div>
          <p>{item.model}</p>
        </div>
        <div className={s.availability_wrapper}>
          <p className={availability ? `${s.green}` : `${s.red}`}>
            {availability ? "Disponible" : "Reservado"}
          </p>
        </div>
      </div>
      <div className={s.wrapper}>
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
          <XmarkButton handleClose={handleRemoveFromCart} height={15} />
        </div>
      </div>
    </div>
  );
}
