import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUniqueUser } from "../../utils/fetch_users";
import AdminMain from "../../components/AdminMain/AdminMain";
import GearAdminCard from "../../components/GearAdminCard/GearAdminCard";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminEquipmentPage.module.scss";

export default function AdminEquipment({ equipment }) {
  const router = useRouter();
  const [equipmentList, setEquipmentList] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const getEquipment = async () => {
      try {
        const response = await fetch(
          process.env.NODE_ENV === "production"
            ? `https://guanaco-rental-production.up.railway.app/equipment?category=${category}`
            : `http://localhost:3001/equipment?category=${category}`
        );
        const data = await response.json();
        setEquipmentList(data);
      } catch (e) {}
    };

    if (category === "all") {
      setEquipmentList(equipment);
    } else {
      getEquipment();
    }
  }, [category, equipment]);

  //   <div className={s.flex}>
  //   <h1>Equipos</h1>
  //   <p>total: {equipment.length}</p>
  // </div>

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Equipment</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <AdminMain title="Equipos">
        <div className={s.flex}>
          <p>
            Total: <span className={s.bold}>{equipment.length}</span>
          </p>
          <div>
            <select
              defaultValue="all"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">TODOS</option>
              <option value="camaras">CAMARAS</option>
              <option value="lentes">LENTES</option>
              <option value="monitores">MONITORES</option>
              <option value="estabilizadores/tripodes">
                ESTABILIZADORES/TRIPODES
              </option>
              <option value="iluminacion">ILUMINACION</option>
              <option value="sonido">SONIDO</option>
              <option value="grip">GRIP</option>
              <option value="otros">OTROS</option>
              <option value="drones">DRONES</option>
            </select>
          </div>
        </div>
        <div>
          {equipmentList &&
            equipmentList.length > 0 &&
            equipmentList.map((gear) => (
              <GearAdminCard key={gear.id} gear={gear} />
            ))}
        </div>
      </AdminMain>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  const user = await getUniqueUser(session?.user.email);

  if (!session || user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const equipment = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/equipment`
      : `http://localhost:3001/equipment`
  )
    .then((response) => response.json())
    .catch((e) => console.log("fecth error:", e));

  return {
    props: {
      equipment,
      session,
    },
  };
}
