import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/features/cart/cartSlice";
import { formatPrice } from "../../../../utils/price_formater";
import { isAvailable } from "../../../../utils/dates_functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import CalendarComponent from "../../EquipmentFilters/Calendar/Calendar";

import s from "./EquipmentCard.module.scss";

export default function EquipmentCard({ gear, setShowCart }) {
  const dispatch = useDispatch();
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSeeMore = () => {
    setShowCalendar(true);
  };

  const dates = useSelector((state) => state.date.date_range);
  const cart = useSelector((state) => state.cart.items);

  const availability = isAvailable(dates, gear);

  const addItemToCart = () => {
    if (cart.length === 0) {
      setShowCart(true);
    }
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
          daysTaken={gear.bookings
            .map((bookModel) => bookModel.book.dates)
            .flat()}
          freeTileClass={true}
        />
      )}
      <article className={s.container}>
        <div className={s.image_wrapper}>
          <Image
            src={`/equipmentPics/${gear.image}`}
            alt={`${gear.name}/${gear.model}`}
            layout="fill"
            quality={70}
            objectFit="contain"
            priority={gear.image === "rokinon12.jpg"}
          />
        </div>
        <div className={s.name_wrapper_flex}>
          <p>{gear.name}</p>
          <p>{gear.brand}</p>
        </div>
        <p>{gear.model}</p>
        <div className={s.see_more_flex}>
          <p className={availability ? `${s.green}` : `${s.red}`}>
            {availability ? "Disponible" : "Reservado"}
          </p>
          <button type="button" onClick={handleSeeMore}>
            ver más
          </button>
        </div>
        <div className={s.add_to_cart_btn}>
          <p className={s.price_bold}>{formatPrice(gear.price)}</p>

          <button
            type="button"
            onClick={addItemToCart}
            disabled={!availability}
            aria-label="add-to-cart"
          >
            {/* + carrito */}
            <FontAwesomeIcon icon={faCartPlus} height="20" />
          </button>
        </div>
      </article>
    </>
  );
}
