import EquipmentCard from "./EquipmentCard/EquipmentCard";
import s from "./EquipmentList.module.scss";

export default function EquipmentList({ equipment }) {
  return (
    <section className={s.container}>
      {equipment.length > 0 &&
        equipment.map((gear) => <EquipmentCard key={gear.id} gear={gear} />)}
    </section>
  );
}
