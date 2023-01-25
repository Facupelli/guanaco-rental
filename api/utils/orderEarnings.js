const getWorkingTotalDays = (dates, pickupHour) => {
  let weekDay = 0;
  let weekendDay = 0;
  let bookedDates = dates.slice(0, -1);

  for (let day of bookedDates) {
    const newDay = new Date(day).getDay();

    //si es sabado o domingo
    if (newDay === 6 || newDay === 0) {
      weekendDay += 1;
    } else {
      //si es el primer dia
      if (
        new Date(day).getTime() === new Date(bookedDates[0]).getTime() &&
        newDay === 5 &&
        pickupHour === "09:00"
      ) {
        weekDay += 0.5;
      } else if (
        new Date(day).getTime() === new Date(bookedDates[0]).getTime() &&
        newDay === 5 &&
        pickupHour === "20:00"
      ) {
        weekDay += 0;
      }
      //si es cualquier otro dia de la semana habil
      else {
        weekDay += 1;
      }
    }
  }

  return weekDay + weekendDay / 2;
};

const getOwnerEarningsByOrder = (order) => {
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

  if (order.fixedDiscount) {
    const discount = order.fixedDiscount.discount / 100;
    return {
      totalFederico: totalFederico - totalFederico * discount,
      totalOscar: totalOscar - totalOscar * discount,
      totalSub: totalSub - totalSub * discount,
    };
  }

  if (order.coupon) {
    const discount = order.coupon.discount / 100;
    return {
      totalFederico: totalFederico - totalFederico * discount,
      totalOscar: totalOscar - totalOscar * discount,
      totalSub: totalSub - totalSub * discount,
    };
  }

  console.log("DEVOLUCION GET OWNER EARNINGS BY ORDER", {
    totalFederico,
    totalOscar,
    totalSub,
  });

  return {
    totalFederico,
    totalOscar,
    totalSub,
  };
};

module.exports = { getOwnerEarningsByOrder };
