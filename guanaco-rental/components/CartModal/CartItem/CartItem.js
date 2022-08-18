import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/features/cart/cartSlice";
import { formatPrice } from "../../../utils/price_formater";
import ItemCounter from "./ItemCounter/ItemCounter";
import s from "./CartItem.module.scss";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className={s.item_container}>
      <div className={s.item_headline}>
        <p>{item.name}</p>
        <button type="button" onClick={handleRemoveFromCart}>
          X
        </button>
      </div>
      <p>{item.model}</p>
      <div className={s.flex_wrapper}>
        <ItemCounter
          key={item.id}
          itemId={item.id}
          stock={item.stock}
          quantity={item.quantity}
        />
        <p>{formatPrice(item.price)}</p>
      </div>
    </div>
  );
}
