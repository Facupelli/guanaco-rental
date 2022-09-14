import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatPrice } from "../../utils/price";
import s from "./AdminDiscountCard.module.scss";

export default function AdminDiscountCard({ discount }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [editMode, setEditMode] = useState(false);

  const handlePutDiscount = async () => {
    setEditMode(false);
  };

  return (
    <div className={s.discount_card_container}>
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
        <button
          type="button"
          onClick={editMode ? handlePutDiscount : () => setEditMode(true)}
        >
          {editMode ? "CONFIRMAR" : "EDITAR"}
        </button>
      </div>
    </div>
  );
}
