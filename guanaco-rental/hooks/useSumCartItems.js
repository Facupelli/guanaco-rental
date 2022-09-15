import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getWorkingTotalDays } from "../utils/dates_functions";

export const getCartTotalPrice = (couponApplied, cart, date) => {
  const workingDays = getWorkingTotalDays(date.date_range, date.pickup_hour);

  const totalPrice = cart.reduce((curr, acc) => {
    return curr + (acc.quantity ? acc.price * acc.quantity : acc.price);
  }, 0);

  const cartTotal = totalPrice * workingDays;

  return cartTotal;
};

export const useSumCartItems = (couponApplied) => {
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date);

  const [totalCartPrice, setTotalCartPrice] = useState({});

  useEffect(() => {
    if (date.date_range && cart.length > 0) {
      const total = getCartTotalPrice(couponApplied, cart, date);
      setTotalCartPrice(total);
    }
  }, [date.date_range, date.pickup_hour, cart, couponApplied?.success]);

  return { totalCartPrice };
};
