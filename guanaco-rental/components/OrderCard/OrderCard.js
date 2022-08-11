import { useState } from "react";
import { formatPrice } from "../../utils/price_formater";

import s from "./OrderCard.module.scss";

export default function OrderCard({ order, i }) {
  const [showEquipment, setShowEquipment] = useState(false);

  return (
    <div>
      <p>{i + 1}</p>
      <button onClick={() => setShowEquipment(true)}>Ver Equipos</button>
      <p>{formatPrice(order.totalPrice)}</p>
      {showEquipment && (
        <div>
          {order.equipments.length > 0 &&
            order.equipments.map((gear) => (
              <div>
                <p>
                  {gear.name} {gear.model}
                </p>
                {/* <p>qty: {gear.bookings.filter(book => )}</p> */}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
