import { useSelector } from "react-redux";
import { getWorkingTotalDays } from "../utils/dates_functions";

export const getCartTotalPrice = (cart, date) => {
  console.log("PICKUP HOUR", date.pickup_hour);
  const workingDays = getWorkingTotalDays(date.date_range, date.pickup_hour);

  const totalPrice = cart.reduce((curr, acc) => {
    return curr + (acc.quantity ? acc.price * acc.quantity : acc.price);
  }, 0);

  const cartTotal = totalPrice * workingDays;

  return cartTotal;
};

export const useSumCartItems = () => {
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date);

  // const [totalCartPrice, setTotalCartPrice] = useState({});

  let total;
  if (date.date_range && cart.length > 0) {
    total = getCartTotalPrice(cart, date);
    // setTotalCartPrice(total);
  }

  return total;
};
