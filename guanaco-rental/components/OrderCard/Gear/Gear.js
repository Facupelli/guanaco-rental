import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import XmarkButton from "../../XmarkButton/XmarkButton";
import MessageModal from "../../MessageModal/MessageModal";

import s from "./Gear.module.scss";

export default function Gear({ gear, order, editable }) {
  const [showModal, setShowModal] = useState(false);

  console.log(showModal)

  return (
    <>
      {showModal && (
        <MessageModal showButton btnFunc={() => setShowModal(false)}>
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
        {editable && (
          <div className={s.x_btn_wrapper}>
            <XmarkButton handleClose={() => setShowModal(true)} />
          </div>
        )}
      </div>
    </>
  );
}
