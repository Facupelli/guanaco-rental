import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  filterByDateRange,
  setEquipment,
} from "../../../redux/features/equipment/equipmentSlice";
import { setDate } from "../../../redux/features/pickupDate/pickupDateSlice";
import { calendar_dictionary } from "../../../utils/calendar_dictionary";
import CalendarComponent from "./Calendar/Calendar";

import s from "./EquipmentFilters.module.scss";

export default function EquipmentFilters({ setFilters }) {
  const [datePickup, setDatePickup] = useState(false);
  const [dateRange, setDateRange] = useState(null);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const category = watch("category");

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

  useEffect(() => {
    // if (dateRange) {
    //   const dates = dateRange.map((date) => date.toLocaleDateString());
    //   console.log(dates)
    //   dispatch(filterByDateRange(dates));
    // }
    if (dateRange) {
      const dates = dateRange.map((date) => date.toLocaleDateString("es-EN"));
      console.log(dates)
      const allDates = [];

      const pickup_month = Number(dates[0].split("/")[1]);
      const return_month = Number(dates[1].split("/")[1]);
      const pickup_day = Number(dates[0].split("/")[0]);
      const return_day = Number(dates[1].split("/")[0]);

      const getAllDates = () => {
        const days = 0;
        if (pickup_month === return_month) {
          for (let i = pickup_day; i <= return_day; i++) {
            days += 1;
            allDates.push(`${pickup_month}/${i}/${dates[0].split("/")[2]}`);
            console.log(allDates)
          }
        }
        if (pickup_month < return_month) {
          for (
            let i = pickup_day;
            i <= calendar_dictionary[String(pickup_month)];
            i++
          ) {
            days += 1;
            allDates.push(`${pickup_month}/${i}/${dates[0].split("/")[2]}`);
          }
          for (let i = 1; i <= return_day; i++) {
            days += 1;
            allDates.push(`${return_month}/${i}/${dates[1].split("/")[2]}`);
          }
        }
        return days;
      };
      getAllDates();

      dispatch(setDate(allDates));
    }
  }, [dateRange]);

  return (
    <section>
      {datePickup && (
        <CalendarComponent
          dateRange={dateRange}
          setDateRange={setDateRange}
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
          <p>{dateRange && dateRange[0].toLocaleDateString()}</p>
          <p>Devolución:</p>
          <p>{dateRange && dateRange[1].toLocaleDateString()}</p>
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
