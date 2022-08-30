import { useState } from "react";
import { formatPrice } from "../../utils/price_formater";
import Gear from "./Gear/Gear";
import { usePDF } from "@react-pdf/renderer";

import s from "./OrderCard.module.scss";
import { RemitoPDF } from "./RemitoPDF";

export default function OrderCard({ order, getAllOrders }) {
  const [showEquipment, setShowEquipment] = useState(false);
  const [generatePDF, setGeneratePDF] = useState(false);

  const pickupDay = new Date(order.booking.dates[0]).toLocaleDateString();
  const returnDay = new Date(order.booking.dates.at(-1)).toLocaleDateString();

  const getOrderStatus = () => {
    if (new Date().getTime() < new Date(order.booking.dates[0]).getTime()) {
      return "PENDIENTE";
    }
    if (new Date().getTime() > new Date(order.booking.dates.at(-1)).getTime()) {
      return "FINALIZADO";
    }
    return "EN PROCESO";
  };

  const handleDeleteOrder = async (id) => {
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

  return (
    <div className={s.card_container}>
      <div className={s.info_container}>
        <p>{order.number}</p>
        <p>{order.user.fullName}</p>
        <p>{order.user.phone}</p>
        <p>{order.user.dniNumber}</p>
        <p>{new Date(order.createdAt).toLocaleDateString()}</p>
        <div>
          <p>retiro: {pickupDay}</p>
          <p>devolución: {returnDay}</p>
        </div>
        <p>{getOrderStatus()}</p>
        <button onClick={() => setShowEquipment(!showEquipment)}>
          Ver Equipos
        </button>
        <p>{formatPrice(order.totalPrice)}</p>
      </div>
      {showEquipment && (
        <div className={s.equipments_container}>
          <p>Equipos:</p>
          {order.equipments.length > 0 &&
            order.equipments.map((gear) => (
              <Gear gear={gear} order={order} key={gear.id} />
            ))}
          <button
            type="button"
            className={s.cancel_order}
            onClick={() => handleDeleteOrder(order.bookingId)}
          >
            CANCELAR ORDEN
          </button>
        </div>
      )}
      <div className={s.remito_wrapper}>
        {!generatePDF && (
          <button type="button" onClick={() => setGeneratePDF(true)}>
            Generar Remito
          </button>
        )}
        {generatePDF && (
          <PDF pickupDay={pickupDay} returnDay={returnDay} order={order} />
        )}
      </div>
    </div>
  );
}

const PDF = ({ pickupDay, returnDay, order }) => {
  const [instance, updateInstance] = usePDF({
    document: (
      <RemitoPDF pickupDay={pickupDay} returnDay={returnDay} order={order} />
    ),
  });

  return instance.loading ? (
    <p className={s.bold}>Cargando...</p>
  ) : (
    <a
      href={instance.url}
      download={`Remito ${order.user.fullName} - ${order.number}`}
    >
      Descargar remito
    </a>
  );
};
