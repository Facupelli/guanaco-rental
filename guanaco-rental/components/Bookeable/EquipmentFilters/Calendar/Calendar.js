import { DateRangePicker } from "react-date-range";

import s from "./Calendar.module.scss";

export default function Calendar() {
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const handleSelect = (date) => {
    console.log(date);
  };

  return (
    <aside className={s.calendar_container}>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
    </aside>
  );
}
