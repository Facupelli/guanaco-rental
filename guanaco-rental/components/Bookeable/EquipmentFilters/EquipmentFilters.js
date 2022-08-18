import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEquipment,
  filterByDateRange,
  setEquipment,
} from "../../../redux/features/equipment/equipmentSlice";
import { setDate } from "../../../redux/features/pickupDate/pickupDateSlice";
import { calendar_dictionary } from "../../../utils/calendar_dictionary";
import CalendarComponent from "./Calendar/Calendar";

import s from "./EquipmentFilters.module.scss";

export default function EquipmentFilters({
  setFilters,
  dateRange,
  setDatePickup,
  datePickup,
}) {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date.date_range);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const category = watch("category");

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category }));
    if (category) {
      dispatch(fetchEquipment(category));
    }
  }, [category]);

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form_container}>
        <div className={s.flex_column}>
          {/* <label>Filtrar por:</label> */}
          <button type="button" onClick={() => setDatePickup(true)}>
            SELECCIONAR FECHA
          </button>
          <div className={s.flex_wrapper}>
            <p>Retiro: </p>
            <p className={date.length > 0 ? "" : s.mock}>
              {date && date.length > 0
                ? new Date(date[0]).toLocaleDateString()
                : "DD/MM/YYYY"}
            </p>
          </div>
          <div className={s.flex_wrapper}>
            <p>Devolución:</p>
            <p className={date.length > 0 ? "" : s.mock}>
              {date && date.length > 0
                ? new Date(date[date.length - 1]).toLocaleDateString()
                : "DD/MM/YYYY"}
            </p>
          </div>
        </div>
        <div className={s.select_wrapper}>
          <label>Categoría:</label>
          <select defaultValue="all" {...register("category")}>
            <option value="all">TODOS</option>
            <option value="camaras">CAMARAS</option>
            <option value="lentes">LENTES</option>
            <option value="monitores">MONITORES</option>
            <option value="estabilizadores">ESTABILIZADORES/TRIPODES</option>
            <option value="iluminacion">ILUMINACION</option>
            <option value="sonido">SONIDO</option>
            <option value="grip">GRIP</option>
            <option value="otros">OTROS</option>
            <option value="drones">DRONES</option>
          </select>
        </div>
      </form>
    </section>
  );
}
