import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useCallback, useRef } from "react";

import s from "./EquipmentFilters.module.scss";

export default function EquipmentFilters({
  filters,
  setFilters,
  setDatePickup,
  setQtyToShow,
}) {
  const date = useSelector((state) => state.date.date_range);
  const { handleSubmit } = useForm();
  const onSubmit = (data) => {};

  const onSelectCategory = (e) => {
    setFilters((prev) => ({ ...prev, category: e.target.value }));
    setQtyToShow(30);
  };

  const filtersRef = useRef(null);

  useOnClickOutside(
    filtersRef,
    useCallback(() => {
      document.getElementById("filters").checked = false;
    }, [])
  );

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form_container}>
        <input
          type="checkbox"
          id="filters"
          name="filters"
          className={s.click}
        />
        <label htmlFor="filters" className={s.filters_icon_wrapper}>
          Filtros
          <FontAwesomeIcon
            icon={faFilter}
            width="25px"
            className={s.filter_icon}
          />
        </label>
        <div className={s.mobile_filters} ref={filtersRef}>
          <div className={s.flex_column}>
            {/* <label>Filtrar por:</label> */}
            <button type="button" onClick={() => setDatePickup(true)}>
              SELECCIONAR FECHA
              <FontAwesomeIcon icon={faCalendarDays} height="15" />
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
                  ? new Date(date.at(-1)).toLocaleDateString()
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
              className={`${
                filters.category === "all" ? s.category_active : ""
              }`}
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
        </div>
      </form>
    </section>
  );
}
