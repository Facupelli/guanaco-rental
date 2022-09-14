import { useState } from "react";
import { useForm } from "react-hook-form";

import s from "./CreateCoupon.module.scss";

export default function CreateDiscount({ getFixedDiscounts, setShowModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const discountData = JSON.stringify(data);

    try {
      setLoading(true);
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://guanaco-rental-production.up.railway.app/fixedDiscounts`
          : "http://localhost:3001/fixedDiscounts",
        {
          method: "POST",
          body: discountData,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const newFixedDiscount = await response.json();

      if (newFixedDiscount.message === "success") {
        getFixedDiscounts();
        setLoading(false);
        setShowModal(false);
      }
    } catch (e) {
      console.log("create fixed discount error:", e);
      setLoading(false);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>CREAR DECUENTO FIJO</h2>
      <label htmlFor="minPrice">Precio mínimo*:</label>
      <input type="text" id="minPrice" {...register("minPrice")} />
      <label htmlFor="minDates">Jornadas mínimas*:</label>
      <input type="text" id="minDates" {...register("minDates")} />
      <label htmlFor="minUserOrders">Pedidos de usuario minímos*:</label>
      <input type="text" id="minUserOrders" {...register("minUserOrders")} />
      <label htmlFor="discount">Descuento*: (%)</label>
      <input type="text" id="discount" {...register("discount")} />
      <button type="submit">{loading ? "CARGANDO" : "CREAR"}</button>
    </form>
  );
}
