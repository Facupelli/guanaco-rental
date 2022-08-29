import Calendar from "react-calendar";
import { useCallback, useRef, useState } from "react";

import s from "./Calendar.module.scss";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

export default function CalendarComponent({
  dateRange,
  setDateRange,
  setDatePickup,
  daysTaken = [],
  freeTileClass,
}) {
  const calendarRef = useRef(null);

  useOnClickOutside(
    calendarRef,
    useCallback(() => setDatePickup(false),[setDatePickup])
  );

  const handleClickOk = () => {
    setDatePickup(false);
  };

  return (
    <aside className={s.calendar_container} ref={calendarRef}>
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
            if (freeTileClass && new Date().getTime() <= date.getTime()) {
              return s.free_tile;
            }
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
