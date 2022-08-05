import { useSelector } from "react-redux";
import s from "./EquipmentCard.module.scss";

export default function EquipmentCard({ gear }) {
  const dates = useSelector((state) => state.date.date_range);

  // console.log("equipCard: dates", dates)

  const isAvailable =
    gear.bookings.filter((date) => dates.indexOf(date) >= 0).length > 0
      ? false
      : true;

  return (
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
      <p className={isAvailable ? `${s.green}` : `${s.red}`}>
        {isAvailable ? "Disponible" : "Reservado"}
      </p>
      <button>Agregar al carrito</button>
    </div>
  );
}
