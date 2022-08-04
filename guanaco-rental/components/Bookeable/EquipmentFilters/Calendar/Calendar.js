import { es } from "date-fns/locale";
import { useState } from "react";
import { DateRange } from "react-date-range";

import s from "./Calendar.module.scss";

export default function Calendar({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setDatePickup,
}) {
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handleClickOk = () => {
    setDatePickup(false);
  };

  return (
    <aside className={s.calendar_container}>
      <DateRange
        ranges={[selectionRange]}
        minDate={new Date()}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        months={1}
        open={false}
        locale={es}
      />
      <div className={s.btn_container}>
        <button type="button" onClick={handleClickOk}>
          OK
        </button>
      </div>
    </aside>
  );
}
