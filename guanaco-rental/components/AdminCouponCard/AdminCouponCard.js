import s from "./AdminCouponCard.module.scss";

export default function AdminCouponCard({ coupon, danger }) {
  return (
    <div className={`${s.card_container} ${danger ? s.danger_border : ""}`}>
      <p className={s.bold}>{coupon.name}</p>
      <p>Descuento: <span className={s.bold_600}>{coupon.discount}%</span></p>
      {coupon.maxOrders && <p>Max: {coupon.maxOrders}</p>}
      {coupon.expirationDate && (
        <p>Fecha: {new Date(coupon.expirationDate).toLocaleDateString()}</p>
      )}
    </div>
  );
}
