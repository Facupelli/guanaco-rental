const isAvailable = (dates, item) => {
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

const areAllItemsAvailable = (cart, dates) => {
  let availability = true;
  cart.map((item) => {
    if (!isAvailable(dates, item)) {
      availability = false;
    }
  });
  return availability;
};

module.exports = { isAvailable, areAllItemsAvailable };
