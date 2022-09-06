import { getWorkingTotalDays } from "./dates_functions";

export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumSignificantDigits: 12,
  }).format(price);
};

export const getOwnerEarnings = (order) => {
  const totalFederico = 0;
  const totalOscar = 0;

  const workingsDays = getWorkingTotalDays(order.booking.dates);

  for (let gear of order.equipments) {
    const gearQty = gear.bookings.filter(
      (book) => book.bookId === order.booking.id
    )[0].quantity;

    if (gear.owner === "FEDERICO") {
      totalFederico += workingsDays * gear.price * gearQty;
    } else if (gear.owner === "OSCAR") {
      totalOscar += workingsDays * gear.price * gearQty;
    } else {
      totalFederico += (workingsDays * gear.price * gearQty) / 2;
      totalOscar += (workingsDays * gear.price * gearQty) / 2;
    }
  }

  return {
    totalFederico,
    totalOscar,
  };
};
