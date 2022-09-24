import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/features/cart/cartSlice";
import { formatPrice } from "../../../utils/price";
import ItemCounter from "./ItemCounter/ItemCounter";
import XmarkButton from "../../XmarkButton/XmarkButton";

import s from "./CartItem.module.scss";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));

    //localstorage
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      const updatedCart = JSON.parse(localCart).filter(
        (localItem) => localItem.id !== item.id
      );
      localStorage.setItem("cart", JSON.stringify([...updatedCart]));
    }
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
