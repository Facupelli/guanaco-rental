import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addQuantity,
  substractQuantity,
} from "../../../../redux/features/cart/cartSlice";
import s from "./ItemCounter.module.scss";

export default function ItemCounter({ itemId, stock, quantity = 1 }) {
  const dispatch = useDispatch();

  const handleAddQty = () => {
    if (quantity < stock) {
      dispatch(addQuantity(itemId));
    }
  };

  const handleRemoveQty = () => {
    if (quantity > 1) {
      dispatch(substractQuantity(itemId));
    }
  };

  return (
    <div className={s.counter_container}>
      <button type="button" onClick={handleRemoveQty}>
        -
      </button>
      <p>{quantity}</p>
      <button type="button" onClick={handleAddQty}>
        +
      </button>
    </div>
  );
}
