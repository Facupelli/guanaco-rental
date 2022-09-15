import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "../../../utils/price";
import { useState } from "react";

import MessageModal from "../../MessageModal/MessageModal";

import s from "./CartSubTotal.module.scss";

export default function CartSubTotal({ totalCartPrice }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <MessageModal
          showButton
          btnFunc={() => setShowModal(false)}
          btnName="CERRAR"
        >
          <p>
            A los pedidos que superen los $40.000 o que se alquilen por más de 3
            días se les aplica un descuento de 10%.
          </p>
          <p>
            A nuestros clientes frecuentes con más de 10 pedidos realizados, si
            el pedido supera los $15.000 se le aplica un descento de 10%.
          </p>
          <p>Si tienes un cupón los descuentos NO son acumulativos.</p>
        </MessageModal>
      )}
      {totalCartPrice?.discount && (
        <>
          <div className={`${s.flex} ${s.font_small}`}>
            <p>Sub Total:</p>
            <p>{formatPrice(totalCartPrice.subTotal)}</p>
          </div>
          <div className={`${s.flex} ${s.font_small} ${s.margin_b}`}>
            <p>
              Descuento:{" "}
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className={s.question_icon}
                onClick={() => setShowModal(true)}
              />
            </p>
            <p>{totalCartPrice.discount}%</p>
          </div>
        </>
      )}
    </>
  );
}
