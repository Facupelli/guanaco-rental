import ItemCounter from "../CartModal/CartItem/ItemCounter/ItemCounter";
import { formatPrice } from "../../utils/price_formater";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/features/cart/cartSlice";

import s from "./CartPageItem.module.scss";

export default function CartPageItem({ item }) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className={s.item_container}>
      <div className={s.item_title}>
        <p>{item.name}</p>
        <p>{item.brand}</p>
        <p>{item.model}</p>
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
      <button type="button" onClick={handleRemoveFromCart}>
        X
      </button>
    </div>
  );
}
