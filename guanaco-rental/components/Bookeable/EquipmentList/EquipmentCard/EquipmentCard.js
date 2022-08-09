import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/features/cart/cartSlice";
import CalendarComponent from "../../EquipmentFilters/Calendar/Calendar";
import { formatPrice } from "../../../../utils/price_formater";
import { isAvailable } from "../../../../utils/generate_all_dates";

import s from "./EquipmentCard.module.scss";

export default function EquipmentCard({ gear }) {
  const dispatch = useDispatch();
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSeeMore = () => {
    setShowCalendar(true);
  };

  const dates = useSelector((state) => state.date.date_range);
  const cart = useSelector((state) => state.cart.items);

  const availability = isAvailable(dates, gear)

  // console.log("PRUEBA", availableIs());

  const addItemToCart = () => {
    if (cart.filter((item) => item.id === gear.id).length > 0) {
      return;
    }
    dispatch(addToCart(gear));
  };

  return (
    <>
      {showCalendar && (
        <CalendarComponent
          setDatePickup={setShowCalendar}
          daysTaken={gear.bookings.map((book) => book.date)}
          freeTileClass={true}
        />
      )}
      <div className={s.container}>
        <p>{gear.name}</p>
        <p>{gear.brand}</p>
        <p>{gear.model}</p>
        <p>{formatPrice(gear.price)}</p>
        <div className={s.see_more_flex}>
          <p className={availability ? `${s.green}` : `${s.red}`}>
            {availability ? "Disponible" : "Reservado"}
          </p>
          <button type="button" onClick={handleSeeMore}>
            ver más
          </button>
        </div>
        <button type="button" onClick={addItemToCart} disabled={!availability}>
          Agregar al carrito
        </button>
      </div>
    </>
  );
}
