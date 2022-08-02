import s from "./EquipmentOrder.module.scss";

export default function EquipmentOrder() {
  return (
    <form className={s.container}>
      <label>Ordenar por precio</label>
      <select>
        <option>+ a -</option>
        <option>- a +</option>
      </select>
    </form>
  );
}
