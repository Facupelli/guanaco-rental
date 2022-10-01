import { getWorkingTotalDays } from "./dates_functions";

export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumSignificantDigits: 12,
  }).format(price);
};

export const getOwnerEarningsByOrder = (order) => {
  let totalFederico = 0;
  let totalOscar = 0;
  let totalSub = 0;

  const workingsDays = getWorkingTotalDays(
    order.booking.dates,
    order.booking.pickupHour
  );

  for (let gear of order.equipments) {
    const gearQty = gear.bookings.filter(
      (book) => book.bookId === order.booking.id
    )[0].quantity;

    if (gear.owner === "FEDERICO") {
      totalFederico += workingsDays * gear.price * gearQty;
    } else if (gear.owner === "OSCAR") {
      totalOscar += workingsDays * gear.price * gearQty;
    } else if (gear.owner === "SUB") {
      totalSub += workingsDays * gear.price * gearQty * 0.7;
      totalFederico += workingsDays * gear.price * gearQty * 0.15;
      totalOscar += workingsDays * gear.price * gearQty * 0.15;
    } else {
      totalFederico += (workingsDays * gear.price * gearQty) / 2;
      totalOscar += (workingsDays * gear.price * gearQty) / 2;
    }
  }

  return {
    totalFederico,
    totalOscar,
    totalSub,
  };
};

export const getEachTotalEarnings = (orders) => {
  const eachEarnings = orders.map((order) => getOwnerEarningsByOrder(order));

  const federicoEarnings = eachEarnings.reduce((curr, acc) => {
    return curr + acc.totalFederico;
  }, 0);

  const oscarEarnings = eachEarnings.reduce((curr, acc) => {
    return curr + acc.totalOscar;
  }, 0);

  const subEarnings = eachEarnings.reduce((curr, acc) => {
    return curr + acc.totalSub;
  }, 0);

  return {
    federicoEarnings,
    oscarEarnings,
    subEarnings,
  };
};
