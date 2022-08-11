import { useState } from "react";
import { formatPrice } from "../../utils/price_formater";
import Gear from "./Gear/Gear";

import s from "./OrderCard.module.scss";

export default function OrderCard({ order, i }) {
  const [showEquipment, setShowEquipment] = useState(false);

  const pickupDay = new Date(order.booking.dates[0]).toLocaleDateString();
  const returnDay = new Date(
    order.booking.dates[order.booking.dates.length - 1]
  ).toLocaleDateString();

  console.log(order.booking.id);

  return (
    <div className={s.card_container}>
      <div className={s.info_container}>
        <p>{i + 1}</p>
        <p>{new Date(order.createdAt).toLocaleDateString()}</p>
        <div>
          <p>retiro: {pickupDay}</p>
          <p>devolución: {returnDay}</p>
        </div>
        <p>
          {new Date().getTime() < new Date(order.booking.dates[0]).getTime()
            ? "PENDIENTE"
            : "ALQUILANDO"}
        </p>
        <p>{order.user.email}</p>
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
        </div>
      )}
    </div>
  );
}
