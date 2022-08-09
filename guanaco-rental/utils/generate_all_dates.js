export const generateAllDates = (dateRange) => {
  const dates = dateRange.map((date) => date.toLocaleDateString("es-EN"));
  console.log(dates);
  const allDates = [];

  const pickup_month = Number(dates[0].split("/")[1]);
  const return_month = Number(dates[1].split("/")[1]);
  const pickup_day = Number(dates[0].split("/")[0]);
  const return_day = Number(dates[1].split("/")[0]);

  const getAllDates = () => {
    const days = 0;
    if (pickup_month === return_month) {
      for (let i = pickup_day; i <= return_day; i++) {
        days += 1;
        allDates.push(`${pickup_month}/${i}/${dates[0].split("/")[2]}`);
        console.log(allDates);
      }
    }
    if (pickup_month < return_month) {
      for (
        let i = pickup_day;
        i <= calendar_dictionary[String(pickup_month)];
        i++
      ) {
        days += 1;
        allDates.push(`${pickup_month}/${i}/${dates[0].split("/")[2]}`);
      }
      for (let i = 1; i <= return_day; i++) {
        days += 1;
        allDates.push(`${return_month}/${i}/${dates[1].split("/")[2]}`);
      }
    }
    return days;
  };
  getAllDates();
  return allDates;
};

export const isAvailable = (dates, item) => {
  const datesfiltered = dates.map((date) =>
    item.bookings.filter((book) => book.date === date)
  );
  return datesfiltered.filter(
    (el) => el.length === item.stock || item.quantity + el.length > item.stock
  ).length > 0
    ? false
    : true;
};
