import { useState } from "react";
import { handleApplyCoupon } from "../../utils/coupons";
import Loader from "../Loaders/Loader/Loader";
import s from "./AddCoupon.module.scss";

export default function AddCoupon({
  setCouponApplied,
  couponApplied,
  location,
}) {
  const [couponName, setCoupon] = useState("");

  return (
    <div
      className={`${s.coupon} ${couponApplied.success ? s.green_box : ""} ${
        couponApplied.error ? s.danger_box : ""
      }`}
    >
      <details>
        <summary>Ingresar un cupón de descuento</summary>
        <div>
          <input
            type="text"
            placeholder="ingresar código"
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button
            type="button"
            onClick={() =>
              handleApplyCoupon(couponName, setCouponApplied, location)
            }
          >
            {couponApplied.loading ? (
              <div className={s.flex}>
                CARGANDO <Loader small />
              </div>
            ) : (
              "APLICAR"
            )}
          </button>
        </div>
        {couponApplied.success && <p className={s.green}>cupón aplicado</p>}
        {couponApplied.error && (
          <p className={s.danger}>{couponApplied.error}</p>
        )}
      </details>
    </div>
  );
}
