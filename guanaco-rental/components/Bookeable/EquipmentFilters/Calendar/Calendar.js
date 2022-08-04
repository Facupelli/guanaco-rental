import Calendar from "react-calendar";
import { useState } from "react";

import s from "./Calendar.module.scss";

export default function CalendarComponent({
  dateRange,
  setDateRange,
  setDatePickup,
}) {
  console.log(dateRange);

  const handleClickOk = () => {
    setDatePickup(false);
  };

  return (
    <aside className={s.calendar_container}>
      <Calendar
        className={s.calendar}
        onChange={setDateRange}
        value={dateRange}
        selectRange={true}
        locale="es-419"
        minDate={new Date()}
      />
      <div className={s.btn_container}>
        <button type="button" onClick={handleClickOk}>
          OK
        </button>
      </div>
    </aside>
  );
}
