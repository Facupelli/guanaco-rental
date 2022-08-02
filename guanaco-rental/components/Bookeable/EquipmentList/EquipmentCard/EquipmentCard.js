import s from "./EquipmentCard.module.scss";

export default function EquipmentCard({ gear }) {
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
      <button>Agregar al carrito</button>
    </div>
  );
}
