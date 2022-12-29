import { calendar_dictionary } from "./calendar_dictionary";

export const getDatesInRange = (startDate, endDate) => {
  const start = new Date(new Date(startDate));
  const end = new Date(new Date(endDate));

  const date = new Date(start.getTime());

  const dates = [];

  while (date <= end) {
    dates.push(new Date(date).toLocaleDateString("en-US"));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export const generateAllDates = (dateRange) => {
  const allDates = getDatesInRange(dateRange[0], dateRange[1]);
  return allDates;
};

export const isAvailable = (dates, item) => {
  const newBookReturnDay = dates[dates.length - 1];

  const filtered = item.bookings.filter((bookModel) => {
    const bookedDates = bookModel.book.dates.slice(
      0,
      bookModel.book.dates.length - 1
    );
    const bookedPickupDay = bookedDates[0];
    return (
      bookedDates.filter((date) => {
        if (bookedPickupDay === newBookReturnDay) {
          return false;
        } else {
          return dates.indexOf(date) >= 0;
        }
      }).length > 0
    );
  });

  if (filtered.length > 0) {
    const totalQuantity = filtered.reduce((val, acc) => {
      return val + acc.quantity;
    }, 0);

    if ((item.quantity ? item.quantity : 1) + totalQuantity > item.stock) {
      return false;
    }
    return true;
  }

  return true;
};

export const areAllItemsAvailable = (cart, date) => {
  let availability = true;
  cart.map((item) => {
    if (!isAvailable(date, item)) {
      availability = false;
    }
  });
  return availability;
};

export const getWorkingTotalDays = (dates, pickupHour) => {
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
        (pickupHour === "20:00" || pickupHour === "20:30")
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
