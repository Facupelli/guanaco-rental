import { useSelector } from "react-redux";
import s from "./CartModal.scss";

export default function CartModal() {
  const cart = useSelector((state) => state.cart.items);

  return (
    <aside>
      {cart && cart.length > 0 && cart.map((item) => <p>{item.name}</p>)}
    </aside>
  );
}
