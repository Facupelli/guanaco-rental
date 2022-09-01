import Calendar from "react-calendar";
import { useCallback, useRef, useState } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { useDispatch } from "react-redux";

import s from "./Calendar.module.scss";
import { setPickupHour } from "../../../../redux/features/pickupDate/pickupDateSlice";

export default function CalendarComponent({
  dateRange,
  setDateRange,
  setDatePickup,
  daysTaken = [],
  freeTileClass,
}) {
  const calendarRef = useRef(null);
  const dispatch = useDispatch();

  useOnClickOutside(
    calendarRef,
    useCallback(() => setDatePickup(false), [setDatePickup])
  );

  const handleClickOk = () => {
    setDatePickup(false);
  };

  const handleChangeHour = (e) => {
    dispatch(setPickupHour(e.target.value));
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
      <div className={s.flex_column}>
        {dateRange && dateRange[0].getDay() === 5 && (
          <div className={s.pickup_select_wrapper}>
            <label>Retiro a las</label>
            <select defaultValue="09:00" onChange={(e) => handleChangeHour(e)}>
              <option value="09:00">09:00</option>
              <option value="20:00">20:00</option>
            </select>
            <span>hs</span>
          </div>
        )}
        <div className={s.btn_container}>
          <button type="button" onClick={handleClickOk}>
            OK
          </button>
        </div>
      </div>
    </aside>
  );
}
