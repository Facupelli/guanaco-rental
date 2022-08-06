import ItemCounter from "../../CartModal/CartItem/ItemCounter/ItemCounter";
import { formatPrice } from "../../../utils/price_formater";

import s from "./CartPageItem.module.scss";

export default function CartPageItem({ item }) {
  return (
    <div className={s.item_container}>
      <div className={s.item_title}>
        <p>{item.name}</p>
        <p>{item.brand}</p>
        <p>{item.model}</p>
      </div>
      <ItemCounter
        itemId={item.id}
        stock={item.stock}
        quantity={item.quantity}
      />
      <p>
        {item.quantity
          ? formatPrice(item.quantity * item.price)
          : formatPrice(item.price)}
      </p>
    </div>
  );
}
