import s from "./Gear.module.scss";

export default function Gear({ gear, order }) {
  return (
    <div className={s.gear_container}>
      <p>
        {gear.name} {gear.brand} {gear.model}
      </p>
      <p>
        x
        {
          gear.bookings.filter((book) => book.bookId === order.booking.id)[0]
            .quantity
        }
      </p>
    </div>
  );
}
