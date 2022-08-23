import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import s from "./EquipmentFilters.module.scss";

export default function EquipmentFilters({
  filters,
  setFilters,
  setDatePickup,
}) {
  const date = useSelector((state) => state.date.date_range);
  const { handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  const onSelectCategory = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
  };

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
        <div className={s.select_category_wrapper}>
          <label className={s.bold}>Categoría:</label>
          <button
            type="button"
            onClick={(e) => onSelectCategory(e)}
            value="all"
            className={`${filters.category === "all" ? s.category_active : ""}`}
          >
            TODOS
          </button>
          <button
            type="button"
            onClick={(e) => onSelectCategory(e)}
            value="camaras"
            className={`${
              filters.category === "camaras" ? s.category_active : ""
            }`}
          >
            CAMARAS
          </button>
          <button
            type="button"
            onClick={(e) => onSelectCategory(e)}
            value="lentes"
            className={`${
              filters.category === "lentes" ? s.category_active : ""
            }`}
          >
            LENTES
          </button>
          <button
            type="button"
            onClick={(e) => onSelectCategory(e)}
            value="monitores"
            className={`${
              filters.category === "monitores" ? s.category_active : ""
            }`}
          >
            MONITORES
          </button>
          <button
            type="button"
            onClick={(e) => onSelectCategory(e)}
            value="estabilizadores/tripodes"
            className={`${
              filters.category === "estabilizadores/tripodes"
                ? s.category_active
                : ""
            }`}
          >
            ESTABILIZADORES/TRIPODES
          </button>
          <button
            type="button"
            onClick={(e) => onSelectCategory(e)}
            value="iluminacion"
            className={`${
              filters.category === "iluminacion" ? s.category_active : ""
            }`}
          >
            ILUMINACION
          </button>
          <button
            type="button"
            onClick={(e) => onSelectCategory(e)}
            value="sonido"
            className={`${
              filters.category === "sonido" ? s.category_active : ""
            }`}
          >
            SONIDO
          </button>
          <button
            type="button"
            onClick={(e) => onSelectCategory(e)}
            value="grip"
            className={`${
              filters.category === "grip" ? s.category_active : ""
            }`}
          >
            GRIP
          </button>
          <button
            type="button"
            onClick={(e) => onSelectCategory(e)}
            value="otros"
            className={`${
              filters.category === "otros" ? s.category_active : ""
            }`}
          >
            OTROS
          </button>
          <button
            type="button"
            onClick={(e) => onSelectCategory(e)}
            value="drones"
            className={`${
              filters.category === "drones" ? s.category_active : ""
            }`}
          >
            DRONES
          </button>
        </div>
      </form>
    </section>
  );
}
