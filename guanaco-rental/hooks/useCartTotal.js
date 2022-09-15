import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { applyDiscount, checkForDiscounts } from "../utils/cart";
import { useFetchFixedDiscounts } from "../utils/fixedDiscounts";

export const useCartTotal = (
  totalCartPrice,
  date,
  userOrders,
  couponApplied
) => {
  const cart = useSelector((state) => state.cart.items);

  const { fixedDiscounts } = useFetchFixedDiscounts();
  const [totalCartDefinitive, setTotalCartDefinitive] = useState({});

  useEffect(() => {
    if (couponApplied.success) {
      const total =
        totalCartPrice - totalCartPrice * (couponApplied.coupon.discount / 100);
      setTotalCartDefinitive({ total });
      return;
    }

    if (fixedDiscounts) {
      if (totalCartPrice && totalCartPrice > 0) {
        const discounts = checkForDiscounts(
          totalCartPrice,
          date,
          userOrders,
          fixedDiscounts
        );
        if (Math.max(...discounts) > 0) {
          const total = applyDiscount(totalCartPrice, discounts);
          setTotalCartDefinitive({
            subTotal: totalCartPrice,
            discount: Math.max(...discounts),
            total,
          });
        } else {
          setTotalCartDefinitive({
            total: totalCartPrice,
          });
        }
      }
      return;
    }

    setTotalCartDefinitive({
      total: totalCartPrice,
    });
  }, [totalCartPrice, couponApplied.success, cart.length]);

  return { totalCartDefinitive };
};
