import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import s from "./EquipmentFilters.module.scss";

export default function EquipmentFilters({ setFilters, setDatePickup }) {
  const date = useSelector((state) => state.date.date_range);
  const {
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);


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
          <select
            defaultValue="all"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="all">TODOS</option>
            <option value="camaras">CAMARAS</option>
            <option value="lentes">LENTES</option>
            <option value="monitores">MONITORES</option>
            <option value="estabilizadores/tripodes">
              ESTABILIZADORES/TRIPODES
            </option>
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
