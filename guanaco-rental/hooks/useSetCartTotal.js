import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getWorkingTotalDays } from "../utils/dates_functions";

export const getCartTotalPrice = (couponApplied, userData, cart, date) => {
  const workingDays = getWorkingTotalDays(date.date_range, date.pickup_hour);

  const totalPrice = cart.reduce((curr, acc) => {
    return curr + (acc.quantity ? acc.price * acc.quantity : acc.price);
  }, 0);

  const cartTotal = totalPrice * workingDays;

  if (couponApplied?.success) {
    return {
      total: cartTotal - cartTotal * (couponApplied.coupon.discount / 100),
    };
  }

  if (cartTotal > 40000 || date.date_range?.length - 1 > 3) {
    return {
      originalTotal: cartTotal,
      total: cartTotal - cartTotal * 0.1,
      discount: "10%",
    };
  }

  if (userData?.orders?.length > 10 && cartTotal > 15000) {
    return {
      originalTotal: cartTotal,
      total: cartTotal - cartTotal * 0.1,
      discount: "10%",
    };
  }

  return { total: cartTotal };
};

export const useSetCartTotal = (couponApplied) => {
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date);
  const userData = useSelector((state) => state.user.data);

  const [totalCartPrice, setTotalCartPrice] = useState({});

  useEffect(() => {
    if (date.date_range && cart.length > 0) {
      const total = getCartTotalPrice(couponApplied, userData, cart, date);
      setTotalCartPrice(total);
    }
  }, [date.date_range, date.pickup_hour, cart, couponApplied?.success]);

  return { totalCartPrice };
};
