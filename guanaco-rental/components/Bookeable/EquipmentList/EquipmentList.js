import { useSelector } from "react-redux";
import EquipmentCard from "./EquipmentCard/EquipmentCard";
import s from "./EquipmentList.module.scss";

export default function EquipmentList({setShowCart}) {
  const equipment = useSelector((state) => state.equipment.products);
  const isLoading = useSelector((state) => state.equipment.loading);

  return (
    <section className={s.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        equipment.length > 0 &&
        equipment.map((gear) => <EquipmentCard key={gear.id} gear={gear} setShowCart={setShowCart} />)
      )}
    </section>
  );
}
