import { useForm } from "react-hook-form";
import s from "./EquipmentSearchBar.module.scss";

export default function EquipmentSearchBar({ setFilters, filters }) {
  const { handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Buscar equipos"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
      />
    </form>
  );
}
