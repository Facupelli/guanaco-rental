
export const checkForDiscounts = (
  totalCartPrice,
  date,
  userOrders,
  fixedDiscounts
) => {
  return fixedDiscounts.map((discount) => {
    console.log(date?.length - 1 > discount.minDates, date.length)
    if (
      (discount.minPrice ? totalCartPrice > discount.minPrice : true) &&
      (discount.minDates ? date?.length - 1 > discount.minDates : true) &&
      (discount.minUserOrders
        ? userOrders?.length > discount.minUserOrders
        : true)
    ) {
      return discount.discount;
    } else {
      return 0;
    }
  });
};

export const applyDiscount = (totalCartPrice, discounts) => {
  let discountSelected;
  if (discounts) {
    discountSelected = Math.max(...discounts);
  }

  if (discountSelected && discountSelected > 0) {
    return totalCartPrice - totalCartPrice * (discountSelected / 100);
  } else {
    return totalCartPrice;
  }
};
