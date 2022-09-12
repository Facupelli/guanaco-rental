import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEquipment } from "../../redux/features/equipment/equipmentSlice";

import EquipmentSearchBar from "./EquipmentSearchBar/EquipmentSearchBar";
import EquipmentFilters from "./EquipmentFilters/EquipmentFilters";
import EquipmentList from "./EquipmentList/EquipmentList";
import EquipmentOrder from "./EquipmentOrder/EquipmentOrder";

import s from "./Bookeable.module.scss";
import { useDebounce } from "../../hooks/useDebounce";

export default function Bookeable({ dateRange, setDatePickup, setShowCart }) {
  const dispatch = useDispatch();

  const [qtyToShow, setQtyToShow] = useState(30);

  const [filters, setFilters] = useState({
    category: "all",
    order: "none",
    search: "",
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  useEffect(() => {
    dispatch(fetchEquipment(filters.category, filters.order, debouncedSearch));
  }, [filters.category, filters.order, debouncedSearch, dispatch]);

  return (
    <section className={s.container}>
      <EquipmentFilters
        setFilters={setFilters}
        filters={filters}
        dateRange={dateRange}
        setDatePickup={setDatePickup}
        setQtyToShow={setQtyToShow}
      />
      <section>
        <div className={s.top_filters_wrapper}>
          <EquipmentSearchBar
            onInputChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
          <EquipmentOrder setFilters={setFilters} filters={filters} />
        </div>
        <EquipmentList
          setShowCart={setShowCart}
          qtyToShow={qtyToShow}
          setQtyToShow={setQtyToShow}
        />
      </section>
    </section>
  );
}
