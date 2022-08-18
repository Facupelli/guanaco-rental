import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminEquipmentPage.module.scss";

export default function AdminEquipment() {
  const router = useRouter()

  const equipment = useSelector((state) => state.equipment.products);

  return (
    <div>
      <Nav />
      <main className={s.main}>
        <div className={s.title_wrapper}>
          <button type="button" onClick={() => router.back()}>
            {"<-"}
          </button>
          <h1>Equipos</h1>
        </div>
        <div>
          {equipment &&
            equipment.length > 0 &&
            equipment.map((gear) => (
              <div className={s.admin_gear_container}>
                <p>{gear.name}</p>
                <p>{gear.brand}</p>
                <p>{gear.model}</p>
                <label>Available</label>
                <input type="checkbox" />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
