import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import GearAdminCard from "../../components/GearAdminCard/GearAdminCard";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminEquipmentPage.module.scss";

export default function AdminEquipment() {
  const router = useRouter();

  const equipment = useSelector((state) => state.equipment.products);

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Equipment</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
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
              <GearAdminCard key={gear.id} gear={gear} />
            ))}
        </div>
      </main>
    </div>
  );
}
