import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

import Nav from "../../../components/Nav/Nav";
import AdminMain from "../../../components/AdminMain/AdminMain";
import GearAdminCard from "../../../components/GearAdminCard/GearAdminCard";
import EquipmentSearchBar from "../../../components/Bookeable/EquipmentSearchBar/EquipmentSearchBar";
import SelectLoaction from "../../../components/SelectLocation/SelectLocation";
import NavLink from "../../../components/Nav/NavLink/NavLink";

import s from "../../../styles/AdminEquipmentPage.module.scss";

export default function AdminEquipment({ equipment }) {
  const { data: session } = useSession();

  const location = useSelector((state) => state.location.city);

  const [equipmentList, setEquipmentList] = useState([]);
  const [category, setCategory] = useState("all");

  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput, 500);

  const getEquipment = useCallback(async () => {
    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://www.guanacorental.shop/rentalapi/equipment?location=${location}&category=${category}&search=${debouncedSearch}&available=all`
          : `http://localhost:3001/equipment?location=${location}&category=${category}&search=${debouncedSearch}&available=all`
      );
      const data = await response.json();
      setEquipmentList(data);
    } catch (e) {}
  }, [location, category, debouncedSearch]);

  useEffect(() => {
    if (category === "all") {
      setEquipmentList(equipment);
    } else {
      getEquipment();
    }
  }, [category, equipment, getEquipment]);

  useEffect(() => {
    getEquipment();
  }, [debouncedSearch, getEquipment]);

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Equipment</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>

      <Nav />

      <AdminMain title="Equipos">
        <div className={s.flex}>
          <EquipmentSearchBar
            onInputChange={(e) => setSearchInput(e.target.value)}
          />
          <div className={s.select_location_wrapper}>
            <SelectLoaction adminPanel={session?.user.role === "ADMIN"} />
          </div>
          <div className={s.flex_baseline}>
            <p>
              Total: <span className={s.bold}>{equipmentList.length}</span>
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
          <NavLink name="AGREGAR" href="/admin/equipment/add" />
        </div>
        <div>
          {equipmentList &&
            equipmentList.length > 0 &&
            equipmentList.map((gear) => (
              <GearAdminCard
                key={gear.id}
                gear={gear}
                getEquipment={getEquipment}
                token={session?.user.token}
                role={session?.user.role}
              />
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

  if (
    !session ||
    (session?.user.role !== "ADMIN" && session?.user.role !== "EMPLOYEE")
  ) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const equipment = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://www.guanacorental.shop/rentalapi/equipment`
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
