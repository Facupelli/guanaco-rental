export const checkForDiscounts = (
  totalCartPrice,
  date,
  userOrders,
  fixedDiscounts
) => {
  return fixedDiscounts.map((discount) => {
    if (
      (discount.minPrice ? totalCartPrice > discount.minPrice : true) &&
      (discount.minDates ? date?.length - 1 > discount.minDates : true) &&
      (discount.minUserOrders
        ? userOrders?.length > discount.minUserOrders
        : true)
    ) {
      return { discountId: discount.id, discountValue: discount.discount };
    } else {
      return { discountValue: 0 };
    }
  });
};

export const applyDiscount = (totalCartPrice, discounts) => {
  let discountSelected;
  if (discounts) {
    discountSelected = discounts.reduce((acc, curr) => {
      if (acc.discountValue > curr.discountValue) {
        return acc;
      } else {
        return curr;
      }
    });
  }

  if (discountSelected && discountSelected.discountValue > 0) {
    return {
      discountId: discountSelected.discountId,
      discountValue: discountSelected.discountValue,
      total:
        totalCartPrice -
        totalCartPrice * (discountSelected.discountValue / 100),
    };
  } else {
    return totalCartPrice;
  }
};
