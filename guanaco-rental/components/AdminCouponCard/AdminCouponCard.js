import s from "./AdminCouponCard.module.scss";

export default function AdminCouponCard({ coupon, danger }) {
  return (
    <div className={`${s.card_container} ${danger ? s.danger_border : ""}`}>
      <p className={s.bold}>{coupon.name}</p>
      <p>{coupon.discount}%</p>
      {coupon.maxOrders && <p>max: {coupon.maxOrders}</p>}
      {coupon.expirationDate && (
        <p>fecha: {new Date(coupon.expirationDate).toLocaleDateString()}</p>
      )}
    </div>
  );
}
