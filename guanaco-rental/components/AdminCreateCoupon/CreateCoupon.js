import { useState } from "react";
import { useForm } from "react-hook-form";

import s from "./CreateCoupon.module.scss";

export default function CreateCoupon({
  getCoupons,
  setShowCouponModal,
  token,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [newCouponLoading, setNewCouponLoading] = useState(false);

  const onSubmit = async (data) => {
    const couponData = JSON.stringify(data);

    try {
      setNewCouponLoading(true);
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://www.guanacorental.shop/rentalapi/coupons`
          : "http://localhost:3001/coupons",
        {
          method: "POST",
          body: couponData,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            authorization: `${token}`,
          },
        }
      );
      const newCoupon = await response.json();

      if (newCoupon.message === "success") {
        getCoupons();
        setNewCouponLoading(false);
        setShowCouponModal(false);
      }
    } catch (e) {
      console.log("create coupon error:", e);
      setNewCouponLoading(false);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>CREAR CUPÓN</h2>
      <label htmlFor="name">Nombre*:</label>
      <input type="text" id="name" {...register("name")} />
      <label htmlFor="discount">Descuento*: (%)</label>
      <input type="text" id="discount" {...register("discount")} />
      <label htmlFor="expirationDate">Fecha de expiración:</label>
      <input type="date" id="expirationDate" {...register("expirationDate")} />
      <label htmlFor="maxOrders">Máximo número de pedidos:</label>
      <input type="text" id="maxOrders" {...register("maxOrders")} />
      <button type="submit">{newCouponLoading ? "CARGANDO" : "CREAR"}</button>
    </form>
  );
}
