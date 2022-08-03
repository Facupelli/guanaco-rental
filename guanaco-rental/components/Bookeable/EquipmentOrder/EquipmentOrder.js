import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setEquipment } from "../../../redux/features/equipment/equipmentSlice";

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

  const getEquipment = async () => {
    const equipment = await fetch(
      `http://localhost:3001/equipment?category=${filters.category}&order=${order}`
    )
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));
    dispatch(setEquipment(equipment));
  };

  useEffect(() => {
    if (order) {
      getEquipment();
    }
  }, [order]);

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <label>Ordenar por precio</label>
      <select defaultValue="none" {...register("order")}>
        <option value="none">predeterminado</option>
        <option value="desc">descendente</option>
        <option value="asc">ascendente</option>
      </select>
    </form>
  );
}
