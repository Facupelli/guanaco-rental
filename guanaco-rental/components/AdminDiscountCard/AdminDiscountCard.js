import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatPrice } from "../../utils/price";
import s from "./AdminDiscountCard.module.scss";

export default function AdminDiscountCard({ discount, getFixedDiscounts }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    reset(discount);
  }, []);

  const onSubmit = async (data) => {
    setEditMode(false);

    const discountData = JSON.stringify({
      ...data,
      id: discount.id,
    });
    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://guanaco-rental-production.up.railway.app/fixedDiscounts`
          : "http://localhost:3001/fixedDiscounts",
        {
          method: "PUT",
          body: discountData,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const discount = await response.json();
      if (discount.message === "success") {
        getFixedDiscounts();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={s.discount_card_container}
    >
      <div className={s.flex}>
        <p><strong>{discount.name}</strong></p>        
      </div>
      <div className={s.flex}>
        <label htmlFor="minPrice">Precio mínimo:</label>
        <input
          type="text"
          id="minPrice"
          defaultValue={discount.minPrice}
          {...register("minPrice")}
          disabled={editMode ? false : true}
          className={`${editMode ? s.input_edit : ""}`}
        />
      </div>
      <div className={s.flex}>
        <label htmlFor="minDates">Jornadas mínimas:</label>
        <input
          type="text"
          id="minDates"
          defaultValue={discount.minDates}
          {...register("minDates")}
          disabled={editMode ? false : true}
          className={`${editMode ? s.input_edit : ""}`}
        />
      </div>
      <div className={s.flex}>
        <label htmlFor="minUserOrders">Pedidos minímos:</label>
        <input
          type="text"
          id="minUserOrders"
          defaultValue={discount.minUserOrders}
          {...register("minUserOrders")}
          disabled={editMode ? false : true}
          className={`${editMode ? s.input_edit : ""}`}
        />
      </div>
      <div className={s.flex}>
        <label htmlFor="discount">Descuento: %</label>
        <input
          type="text"
          id="discount"
          defaultValue={discount.discount}
          {...register("discount")}
          disabled={editMode ? false : true}
          className={`${editMode ? s.input_edit : ""}`}
        />
      </div>
      <div className={s.edit_btn_wrapper}>
        <button type="button" onClick={() => setEditMode(true)}>
          EDITAR
        </button>
        {editMode && <button type="submit">CONFIRMAR</button>}
      </div>
    </form>
  );
}
