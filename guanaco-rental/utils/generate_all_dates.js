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
  const filtered = item.bookings.filter(
    (book) => book.dates.filter((date) => dates.indexOf(date) >= 0).length > 0
  );
  if (filtered.length > 0) {
    if (item.quantity + filtered[0].quantity > item.stock) {
      return false;
    }
    return true;
  }
  return true;
};
