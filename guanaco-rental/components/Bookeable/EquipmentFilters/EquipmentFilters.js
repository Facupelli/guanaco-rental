import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setEquipment } from "../../../redux/features/equipment/equipmentSlice";
import Calendar from "./Calendar/Calendar";

import s from "./EquipmentFilters.module.scss";

export default function EquipmentFilters({ setFilters }) {
  const [datePickup, setDatePickup] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const category = watch("category");

  console.log(category);

  const getEquipment = async () => {
    const equipment = await fetch(
      `http://localhost:3001/equipment?category=${category}`
    )
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));
    dispatch(setEquipment(equipment));
  };

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category }));
    if (category) {
      getEquipment();
    }
  }, [category]);

  return (
    <section>
      {datePickup && (
        <Calendar
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setDatePickup={setDatePickup}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={s.form_container}>
        <div className={s.flex_column}>
          <label>Retiro</label>
          <button type="button" onClick={() => setDatePickup(!datePickup)}>
            fecha
          </button>
          <p>Retiro: </p>
          <p>{startDate.toDateString()}</p>
          <p>Devolución:</p>
          <p>{endDate.toDateString()}</p>
        </div>
        <div>
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
