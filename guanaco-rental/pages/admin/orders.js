import Head from "next/head";
import { useEffect, useState } from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useFetchAllOrders } from "../../hooks/useFetchAllOrders";
import { useSession } from "next-auth/react";
import { getUniqueUser } from "../../utils/fetch_users";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../redux/features/user/userSlice";

import Nav from "../../components/Nav/Nav";
import AdminMain from "../../components/AdminMain/AdminMain";
import OrderCard from "../../components/OrderCard/OrderCard";
import SelectLoaction from "../../components/SelectLocation/SelectLocation";

import s from "../../styles/AdminOrdersPage.module.scss";

export default function AdminOrdersPage({}) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    if (!userData && session) {
      getUniqueUser(session.user.email).then((res) => dispatch(setUserId(res)));
    }
  }, [userData, session, dispatch]);

  //pagination
  const [skip, setSkip] = useState(0);
  const [sortBy, setSortBy] = useState("booking");

  const { orders, totalOrders, loading, refetchOrders } = useFetchAllOrders(
    skip,
    sortBy
  );

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Pedidos</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <AdminMain title="Pedidos">
        <div className={s.select_location_wrapper}>
          <SelectLoaction adminPanel={session?.user.role === "ADMIN"} />
          <div className={s.sortBy_wrapper}>
            <label>Ordenar por:</label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="booking">Próximos pedidos a entregar</option>
              <option value="desc">Últimos pedidos creados</option>
            </select>
          </div>
        </div>

        <div className={s.table_titles}>
          <p>N°</p>
          <p>NOMBRE</p>
          <p>CELULAR</p>
          <p>DNI</p>
          <p>FECHA</p>
          <p>ALQUILER</p>
          <p>ESTADO</p>
          <p>EQUIPOS</p>
          <p>TOTAL</p>
        </div>
        <div>
          {loading ? (
            <p>Cargando...</p>
          ) : orders && orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                userRole={session?.user.role}
                refetchOrders={refetchOrders}
                token={session?.user.token}
              />
            ))
          ) : (
            <p className={s.no_orders_p}>No tienes ningun pedido :(</p>
          )}
        </div>
        <div className={s.pagination_btn_wrapper}>
          <button
            type="button"
            onClick={() => {
              if (skip >= 10) {
                setSkip((prev) => prev - 10);
              }
            }}
            disabled={skip === 0}
          >
            {"<-"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (skip + 10 < totalOrders) {
                setSkip((prev) => prev + 10);
              }
            }}
            disabled={skip + 10 >= totalOrders}
          >
            {"->"}
          </button>
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

  if (session?.user.role === "ADMIN" || session?.user.role === "EMPLOYEE") {
    return {
      props: { session },
    };
  }

  return {
    redirect: {
      destination: "/",
    },
  };
}
