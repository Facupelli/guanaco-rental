import { useState } from "react";
import { handleApplyCoupon } from "../../utils/coupons";
import Loader from "../Loaders/Loader/Loader";
import s from "./AddCoupon.module.scss";

export default function AddCoupon({ setCouponApplied, couponApplied, location }) {
  const [couponName, setCoupon] = useState("");

  return (
    <div className={s.coupon}>
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
            onClick={() => handleApplyCoupon(couponName, setCouponApplied, location)}
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
        {couponApplied.error && <p>{couponApplied.error}</p>}
      </details>
    </div>
  );
}
