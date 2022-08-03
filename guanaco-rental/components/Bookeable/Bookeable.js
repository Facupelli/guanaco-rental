import EquipmentFilters from "./EquipmentFilters/EquipmentFilters";
import EquipmentList from "./EquipmentList/EquipmentList";
import EquipmentOrder from "./EquipmentOrder/EquipmentOrder";

import s from "./Bookeable.module.scss";

export default function Bookeable({ equipment }) {
  return (
    <article className={s.container}>
      <EquipmentOrder />
      <section className={s.equipment_grid}>
        <EquipmentFilters />
        <EquipmentList />
      </section>
    </article>
  );
}
