import Calendar from "react-calendar";
import { useState } from "react";

import s from "./Calendar.module.scss";

export default function CalendarComponent({
  dateRange,
  setDateRange,
  setDatePickup,
  daysTaken = [],
  freeTileClass,
}) {
  const handleClickOk = () => {
    setDatePickup(false);
  };

  // const days_taken = ["8/13/2022"];

  return (
    <aside className={s.calendar_container}>
      <Calendar
        className={s.calendar}
        onChange={setDateRange}
        value={dateRange}
        selectRange={true}
        locale="es-ES"
        minDate={new Date()}
        tileClassName={({ date, view }) => {
          if (
            daysTaken.find((day) => new Date(day).getTime() === date.getTime())
          ) {
            return s.booked_tile;
          } else {
            return freeTileClass ? s.free_tile : null;
          }
        }}
        tileDisabled={({ date }) => {
          if (
            daysTaken.find((day) => new Date(day).getTime() === date.getTime())
          ) {
            return true;
          } else {
            return false;
          }
        }}
      />
      <div className={s.btn_container}>
        <button type="button" onClick={handleClickOk}>
          OK
        </button>
      </div>
    </aside>
  );
}
