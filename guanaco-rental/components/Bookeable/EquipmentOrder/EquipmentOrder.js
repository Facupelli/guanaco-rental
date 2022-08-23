import { useForm } from "react-hook-form";

import s from "./EquipmentOrder.module.scss";

export default function EquipmentOrder({ filters, setFilters }) {
  const { handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <label>Ordenar por precio</label>
      <select
        defaultValue="none"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, order: e.target.value }))
        }
      >
        <option value="none">estandar</option>
        <option value="desc">descendente</option>
        <option value="asc">ascendente</option>
      </select>
    </form>
  );
}
