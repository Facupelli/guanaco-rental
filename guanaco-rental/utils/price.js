import { getWorkingTotalDays } from "./dates_functions";

export const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumSignificantDigits: 12,
  }).format(price);
};

export const getEachEarnings = (orders) => {
  if (orders.length === 0) {
    return {
      total: 0,
      federico: 0,
      oscar: 0,
      sub: 0,
    };
  }

  const total = orders.reduce((curr, acc) => {
    return curr + acc.totalPrice;
  }, 0);

  const federico = orders.reduce((curr, acc) => {
    return curr + (acc.orderEarnings?.federico ?? 0);
  }, 0);

  const oscar = orders.reduce((curr, acc) => {
    return curr + (acc.orderEarnings?.oscar ?? 0);
  }, 0);

  const sub = orders.reduce((curr, acc) => {
    return curr + (acc.orderEarnings?.sub ?? 0);
  }, 0);

  return {
    total,
    federico,
    oscar,
    sub,
  };
};

// export const getEachTotalEarnings = (orders) => {
//   const eachEarnings = orders.map((order) => getOwnerEarningsByOrder(order));

//   const federicoEarnings = eachEarnings.reduce((curr, acc) => {
//     return curr + acc.totalFederico;
//   }, 0);

//   const oscarEarnings = eachEarnings.reduce((curr, acc) => {
//     return curr + acc.totalOscar;
//   }, 0);

//   const subEarnings = eachEarnings.reduce((curr, acc) => {
//     return curr + acc.totalSub;
//   }, 0);

//   return {
//     federicoEarnings,
//     oscarEarnings,
//     subEarnings,
//   };
// };
