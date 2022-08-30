import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/features/cart/cartSlice";
import { formatPrice } from "../../../utils/price_formater";
import ItemCounter from "./ItemCounter/ItemCounter";
import s from "./CartItem.module.scss";
import XmarkButton from "../../XmarkButton/XmarkButton";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className={s.item_container}>
      <div className={s.item_headline}>
        <p>{item.name}</p>
        <XmarkButton handleClose={handleRemoveFromCart} height={15} />
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
