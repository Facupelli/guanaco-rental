import { applyDiscount, checkForDiscounts } from "../utils/cart";
import { useFetchFixedDiscounts } from "../utils/fixedDiscounts";

export const useApplyDiscountsToCart = (
  totalCartPrice,
  date,
  userOrders,
  couponApplied
) => {
  const { fixedDiscounts } = useFetchFixedDiscounts();

  let totalCartPriceWithDiscounts, discountApplied;

  if (couponApplied.success) {
    const total =
      totalCartPrice - totalCartPrice * (couponApplied.coupon.discount / 100);
    totalCartPriceWithDiscounts = {
      subTotal: totalCartPrice,
      total,
      discountValue: couponApplied.coupon.discount,
    };
    return totalCartPriceWithDiscounts;
  }

  if (fixedDiscounts) {
    if (totalCartPrice && totalCartPrice > 0) {
      const discounts = checkForDiscounts(
        totalCartPrice,
        date,
        userOrders,
        fixedDiscounts
      );

      const discountValues = discounts.map(
        (discount) => discount.discountValue
      );

      if (Math.max(...discountValues) > 0) {
        discountApplied = applyDiscount(totalCartPrice, discounts);
        totalCartPriceWithDiscounts = {
          subTotal: totalCartPrice,
          discountValue: discountApplied.discountValue,
          discountId: discountApplied.discountId,
          total: discountApplied.total,
        };
      } else {
        totalCartPriceWithDiscounts = {
          total: totalCartPrice,
          subTotal: totalCartPrice,
        };
      }
    }
    return totalCartPriceWithDiscounts;
  }

  totalCartPriceWithDiscounts = {
    total: totalCartPrice,
    subTotal: totalCartPrice,
  };

  return totalCartPriceWithDiscounts;
};
