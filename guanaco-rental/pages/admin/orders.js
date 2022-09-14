import Head from "next/head";
import { useEffect, useState } from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getOrCreateUser, getUniqueUser } from "../../utils/fetch_users";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../redux/features/user/userSlice";
import { useSession } from "next-auth/react";
import { useFetchAllOrders } from "../../hooks/useFetchAllOrders";

import AdminMain from "../../components/AdminMain/AdminMain";
import Nav from "../../components/Nav/Nav";
import OrderCard from "../../components/OrderCard/OrderCard";

import s from "../../styles/AdminOrdersPage.module.scss";

export default function AdminOrdersPage({}) {
  const dispatch = useDispatch();

  const userRole = useSelector((state) => state.user.data?.role);
  const { data: session } = useSession();

  useEffect(() => {
    if (!userRole) {
      getOrCreateUser(session.user).then((res) => dispatch(setUserId(res)));
    }
  }, [userRole]);

  //pagination
  const [skip, setSkip] = useState(0);

  const { orders, totalOrders, loading, refetchOrders } = useFetchAllOrders(skip);

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Pedidos</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <AdminMain title="Pedidos">
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
                userRole={userRole}
                refetchOrders={refetchOrders}
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

  const user = await getUniqueUser(session?.user.email);

  if (user?.role === "ADMIN" || user?.role === "EMPLOYEE") {
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
