import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import s from "./EquipmentSearchBar.module.scss";

export default function EquipmentSearchBar({ setFilters, filters }) {
  const { handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={s.search_icon} />
      <input
        className={s.search_input}
        type="search"
        placeholder="Buscar equipos"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
      />
    </form>
  );
}
