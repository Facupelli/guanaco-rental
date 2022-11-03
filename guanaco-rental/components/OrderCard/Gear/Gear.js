import { useState } from "react";

import XmarkButton from "../../XmarkButton/XmarkButton";
import MessageModal from "../../MessageModal/MessageModal";
import { updateGearFromOrder } from "../../../utils/orders";

import s from "./Gear.module.scss";
import Image from "next/image";

export default function Gear({
  gear,
  order,
  editable,
  refetchOrders,
  token,
  indexAdmin,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <MessageModal
          showButton
          btnFunc={() => {
            updateGearFromOrder(order, gear, "remove", 0, token).then(() =>
              refetchOrders()
            );
            setShowModal(false);
          }}
        >
          Seguro que quieres eliminar este equipo del pedido?
        </MessageModal>
      )}
      <div className={s.gear_container}>
        <div className={s.image_wrapper}>
          <Image
            src={`/equipmentPics/${gear.image}`}
            layout="responsive"
            height={40}
            width={40}
            objectFit="cover"
          />
        </div>
        <p className={s.flex_grow_2}>
          {gear.name} {gear.brand} {gear.model}
        </p>
        <p>
          x
          {
            gear.bookings.filter((book) => book.bookId === order.booking.id)[0]
              ?.quantity
          }
        </p>
        {!indexAdmin && editable && !order.delivered && (
          <div className={s.x_btn_wrapper}>
            <XmarkButton handleClose={() => setShowModal(true)} />
          </div>
        )}
      </div>
    </>
  );
}
