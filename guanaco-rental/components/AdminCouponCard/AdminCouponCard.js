import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import s from "./AdminCouponCard.module.scss";

export default function AdminCouponCard({
  coupon,
  danger,
  handleDeleteCoupon,
}) {
  return (
    <div className={`${s.card_container} ${danger ? s.danger_border : ""}`}>
      <div>
        <p className={s.bold}>{coupon.name}</p>
        <button
          type="button"
          aria-label="delete-coupon"
          onClick={() => handleDeleteCoupon(coupon.id)}
        >
          <FontAwesomeIcon icon={faTrash} className={s.trash_icon} />
        </button>
      </div>
      <p>
        Descuento: <span className={s.bold_600}>{coupon.discount}%</span>
      </p>
      {coupon.maxOrders && <p>Max: {coupon.maxOrders}</p>}
      {coupon.expirationDate && (
        <p>Fecha: {new Date(coupon.expirationDate).toLocaleDateString()}</p>
      )}
    </div>
  );
}