import Calendar from "react-calendar";
import { useSession } from "next-auth/react";
import { useCallback, useRef, useState } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { setPickupHour } from "../../../../redux/features/pickupDate/pickupDateSlice";
import { useEffect } from "react";

import s from "./Calendar.module.scss";

export default function CalendarComponent({
  dateRange,
  setDateRange,
  setDatePickup,
  daysTaken = [],
  freeTileClass,
}) {
  const { data: session } = useSession();

  const calendarRef = useRef(null);
  const dispatch = useDispatch();

  const location = useSelector((state) => state.location.city);
  const pickupHour = useSelector((state) => state.date.pickup_hour);

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

  useEffect(() => {
    if (dateRange && new Date(dateRange[0]).getDay() !== 5) {
      dispatch(setPickupHour("09:00"));
    }
  }, [dateRange, location, dispatch]);

  const gearBookingDisabled = ({ date }) => {
    if (daysTaken.find((day) => new Date(day).getTime() === date.getTime())) {
      return true;
    } else {
      return false;
    }
  };

  const weekendDisabled = ({ date }) => {
    if (
      session?.user.role !== "ADMIN" &&
      new Date().toDateString() === date.toDateString()
    ) {
      return true;
    }
    if (date.getDay() === 6 || date.getDay() === 0) {
      return true;
    }
    return false;
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
        tileDisabled={
          daysTaken.length > 0 ? gearBookingDisabled : weekendDisabled
        }
      />
      <div className={s.flex_column}>
        <div className={s.pickup_select_wrapper}>
          <label>Retiro a las</label>
          <select
            value={pickupHour}
            onChange={(e) => handleChangeHour(e)}
            disabled={
              !dateRange || (dateRange && new Date(dateRange[0]).getDay() !== 5)
            }
          >
            <option value="09:00">09:00</option>
            {location === "SAN_JUAN" ? (
              <option value="20:00">20:00</option>
            ) : (
              <option value="20:30">20:30</option>
            )}
          </select>
          <span>hs</span>
        </div>
        <div className={s.btn_container}>
          <button type="button" onClick={handleClickOk}>
            OK
          </button>
        </div>
      </div>
    </aside>
  );
}
