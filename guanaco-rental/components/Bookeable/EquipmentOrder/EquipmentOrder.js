import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchEquipment, setEquipment } from "../../../redux/features/equipment/equipmentSlice";

import s from "./EquipmentOrder.module.scss";

export default function EquipmentOrder({ filters }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const order = watch("order");

  // console.log("order", order);

  useEffect(() => {
    if (order) {
      dispatch(fetchEquipment(filters.category, order));
    }
  }, [order]);

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <label>Ordenar por precio</label>
      <select defaultValue="none" {...register("order")}>
        <option value="none">estandar</option>
        <option value="desc">descendente</option>
        <option value="asc">ascendente</option>
      </select>
    </form>
  );
}
