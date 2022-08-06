import { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuantity } from "../../../../redux/features/cart/cartSlice";
import s from "./ItemCounter.module.scss";

export default function ItemCounter({ itemId, stock }) {
  console.log(stock);
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuntity] = useState(1);

  const handleAddQty = () => {
    if (itemQuantity < stock) {
      setItemQuntity((prev) => (prev += 1));
      dispatch(addQuantity({ id: itemId, quantity: itemQuantity }));
    }
  };

  const handleRemoveQty = () => {
    if (itemQuantity > 1) {
      setItemQuntity((prev) => (prev -= 1));
    }
  };

  return (
    <div className={s.counter_container}>
      <button type="button" onClick={handleRemoveQty}>
        -
      </button>
      <p>{itemQuantity && itemQuantity}</p>
      <button type="button" onClick={handleAddQty}>
        +
      </button>
    </div>
  );
}
