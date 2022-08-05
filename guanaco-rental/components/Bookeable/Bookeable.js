import EquipmentFilters from "./EquipmentFilters/EquipmentFilters";
import EquipmentList from "./EquipmentList/EquipmentList";
import EquipmentOrder from "./EquipmentOrder/EquipmentOrder";

import s from "./Bookeable.module.scss";
import { useState } from "react";

export default function Bookeable({ dateRange, setDatePickup }) {
  const [filters, setFilters] = useState({
    category: "all",
    order: "",
  });

  return (
    <article className={s.container}>
      <EquipmentOrder filters={filters} />
      <section className={s.equipment_grid}>
        <EquipmentFilters
          setFilters={setFilters}
          dateRange={dateRange}
          setDatePickup={setDatePickup}
        />
        <EquipmentList />
      </section>
    </article>
  );
}
