import { getWorkingTotalDays } from "./dates_functions";
import s from "../components/OrderCard/OrderCard.module.scss";

export const fetchAllOrders = (skip, token) => {
  return fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/order?skip=${skip}`
      : `http://localhost:3001/order?skip=${skip}`,
    { headers: { authorization: `${token}` } }
  ).then((res) => res.json());
};

export const getOrderStatus = (order) => {
  if (new Date().getTime() < new Date(order.booking.dates[0]).getTime()) {
    return { status: "PENDIENTE", class: s.yellow };
  }
  if (new Date().getTime() > new Date(order.booking.dates.at(-1)).getTime()) {
    return { status: "FINALIZADO", class: s.green };
  }
  return { status: "EN PROCESO", class: s.orange };
};

export const generatePdfRows = (order) => {
  if (order.equipments.length > 0) {
    const rows = Math.ceil(order.equipments.length / 4);

    const equipmentRows = [];

    for (let i = 0; i < order.equipments.length; i += 4) {
      const chunk = order.equipments.slice(i, i + 4);
      // do whatever
      equipmentRows.push(chunk);
    }

    return equipmentRows;
  }
};

export const handleDeleteOrder = async (id, refetchOrders, token) => {
  const order = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/order/${id}`
      : `http://localhost:3001/order/${id}`,
    {
      method: "DELETE",
      headers: { authorization: `${token}` },
    }
  )
    .then((response) => response.json())
    .catch((e) => console.log("error", e));

  if (order?.message === "success") {
    refetchOrders(10);
  }
};

export const updateGearFromOrder = async (
  order,
  gear,
  operation,
  addGearInputs,
  token
) => {
  const newTotalPrice = () => {
    const workingDays = getWorkingTotalDays(
      order.booking.dates,
      order.booking.pickupHour
    );

    if (operation === "remove") {
      const gearQuantity = gear.bookings.filter(
        (book) => book.bookId === order.booking.id
      )[0].quantity;

      return workingDays * gear.price * gearQuantity;
    }

    return workingDays * (gear.price * addGearInputs.quantity);
  };

  const newPrice = newTotalPrice();

  const data = JSON.stringify({
    bookingId: order.bookingId,
    orderId: order.id,
    equipmentId: gear.id,
    operation,
    newPrice,
    quantity: addGearInputs.quantity,
  });

  try {
    const updatedOrder = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/order`
        : "http://localhost:3001/order",
      {
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          authorization: `${token}`,
        },
      }
    );
  } catch (e) {
    console.log("updateOrder error:", e);
  }
};

export const handleDeliveredChange = async (
  orderId,
  delivered,
  refetchOrders,
  token
) => {
  const data = JSON.stringify({
    orderId,
    delivered,
  });

  try {
    const updatedOrder = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/order`
        : "http://localhost:3001/order",
      {
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          authorization: `${token}`,
        },
      }
    );
    const order = await updatedOrder.json();

    if (order?.message === "success") {
      refetchOrders(10);
    }
  } catch (e) {
    console.log(e);
  }
};
