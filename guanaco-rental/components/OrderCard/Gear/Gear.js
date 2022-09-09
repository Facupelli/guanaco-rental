import { useState } from "react";

import XmarkButton from "../../XmarkButton/XmarkButton";
import MessageModal from "../../MessageModal/MessageModal";
import { updateGearFromOrder } from "../../../utils/orders";

import s from "./Gear.module.scss";

export default function Gear({ gear, order, editable, getAllOrders }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <MessageModal
          showButton
          btnFunc={() => {
            updateGearFromOrder(order, gear, "remove", 0).then(() =>
              getAllOrders()
            );
            setShowModal(false);
          }}
        >
          Seguro que quieres eliminar este equipo del pedido?
        </MessageModal>
      )}
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
        {editable && !order.delivered && (
          <div className={s.x_btn_wrapper}>
            <XmarkButton handleClose={() => setShowModal(true)} />
          </div>
        )}
      </div>
    </>
  );
}
