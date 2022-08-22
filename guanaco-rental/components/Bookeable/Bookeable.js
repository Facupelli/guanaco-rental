import EquipmentFilters from "./EquipmentFilters/EquipmentFilters";
import EquipmentList from "./EquipmentList/EquipmentList";
import EquipmentOrder from "./EquipmentOrder/EquipmentOrder";

import s from "./Bookeable.module.scss";
import { useState } from "react";
import EquipmentSearchBar from "./EquipmentSearchBar/EquipmentSearchBar";

export default function Bookeable({ dateRange, setDatePickup, setShowCart }) {
  const [filters, setFilters] = useState({
    category: "all",
    order: "",
    search: "",
  });

  return (
    <article className={s.container}>
      <section className={s.equipment_grid}>
        <EquipmentFilters
          setFilters={setFilters}
          dateRange={dateRange}
          setDatePickup={setDatePickup}
        />
        <div>
          <div className={s.top_filters_wrapper}>
            <EquipmentSearchBar filters={filters} />
            <EquipmentOrder filters={filters} />
          </div>
          <EquipmentList setShowCart={setShowCart} />
        </div>
      </section>
    </article>
  );
}
