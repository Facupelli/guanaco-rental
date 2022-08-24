import Image from "next/image";
import s from "./GearAdminCard.module.scss";

export default function GearAdminCard({ gear }) {
  return (
    <div className={s.admin_gear_container}>
      <div className={s.image_wrapper}>
        <Image src={`/equipmentPics/${gear.image}`} alt={gear.name} layout="fill" />
      </div>
      <div className={s.flex_grow_2}>
        <div className={`${s.flex_wrapper} ${s.bold}`}>
          <p>{gear.name}</p>
          <p>{gear.brand}</p>
        </div>
        <p>{gear.model}</p>
      </div>
      <div className={`${s.flex_wrapper} `}>
        <label>Disponible:</label>
        <input
          type="checkbox"
          deafultValue={gear.available}
          defaultChecked={gear.available}
        />
      </div>
      <div className={`${s.flex_wrapper} `}>
        <label>Stock:</label>
        <input defaultValue={gear.stock} className={s.stock_input} />
      </div>
      <div className={`${s.flex_wrapper} `}>
        <label>Precio:</label>
        <input defaultValue={gear.price} className={s.price_input} />
      </div>
      <div className={`${s.flex_wrapper} `}>
        <label>Sucursal:</label>
        <select defaultValue={gear.location}>
          <option value="San Juan">San Juan</option>
          <option value="Mendoza">Mendoza</option>
        </select>
      </div>
    </div>
  );
}
