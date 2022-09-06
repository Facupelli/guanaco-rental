import s from "../components/OrderCard/OrderCard.module.scss";

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

export const handleDeleteOrder = async (id, getAllOrders) => {
  const order = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/order/${id}`
      : `http://localhost:3001/order/${id}`,
    {
      method: "DELETE",
    }
  )
    .then((response) => response.json())
    .catch((e) => console.log("error", e));

  if (order.message === "success") {
    getAllOrders();
  }
};