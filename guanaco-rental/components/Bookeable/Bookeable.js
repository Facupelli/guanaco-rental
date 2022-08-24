import EquipmentFilters from "./EquipmentFilters/EquipmentFilters";
import EquipmentList from "./EquipmentList/EquipmentList";
import EquipmentOrder from "./EquipmentOrder/EquipmentOrder";
import { useEffect, useState } from "react";
import EquipmentSearchBar from "./EquipmentSearchBar/EquipmentSearchBar";
import { useDispatch } from "react-redux";
import { fetchEquipment } from "../../redux/features/equipment/equipmentSlice";

import s from "./Bookeable.module.scss";

export default function Bookeable({ dateRange, setDatePickup, setShowCart }) {
  const dispatch = useDispatch();

  const [qtyToShow, setQtyToShow] = useState(30);

  const [filters, setFilters] = useState({
    category: "all",
    order: "none",
    search: "",
  });

  useEffect(() => {
    dispatch(fetchEquipment(filters.category, filters.order, filters.search));
  }, [filters.category, filters.order, filters.search]);

  return (
    <section className={s.container}>
      <div className={s.equipment_grid}>
        <EquipmentFilters
          setFilters={setFilters}
          filters={filters}
          dateRange={dateRange}
          setDatePickup={setDatePickup}
          setQtyToShow={setQtyToShow}
        />
        <section>
          <div className={s.top_filters_wrapper}>
            <EquipmentSearchBar setFilters={setFilters} filters={filters} />
            <EquipmentOrder setFilters={setFilters} filters={filters} />
          </div>
          <EquipmentList
            setShowCart={setShowCart}
            qtyToShow={qtyToShow}
            setQtyToShow={setQtyToShow}
          />
        </section>
      </div>
    </section>
  );
}
