import { useState } from "react";
import { useSelector } from "react-redux";
import CalendarComponent from "../../EquipmentFilters/Calendar/Calendar";

import s from "./EquipmentCard.module.scss";

export default function EquipmentCard({ gear }) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSeeMore = () => {
    setShowCalendar(true);
  };

  const dates = useSelector((state) => state.date.date_range);

  // console.log("equipCard: dates", dates)

  const isAvailable =
    gear.bookings.filter((date) => dates.indexOf(date) >= 0).length > 0
      ? false
      : true;

  return (
    <>
      {showCalendar && (
        <CalendarComponent
          setDatePickup={setShowCalendar}
          daysTaken={gear.bookings}
          freeTileClass={true}
        />
      )}
      <div className={s.container}>
        <p>{gear.brand}</p>
        <p>{gear.model}</p>
        <p>
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumSignificantDigits: 12,
          }).format(gear.price)}
        </p>
        <div className={s.see_more_flex}>
          <p className={isAvailable ? `${s.green}` : `${s.red}`}>
            {isAvailable ? "Disponible" : "Reservado"}
          </p>
          <button type="button" onClick={handleSeeMore}>
            ver más
          </button>
        </div>
        <button type="button">Agregar al carrito</button>
      </div>
    </>
  );
}
