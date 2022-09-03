import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getUniqueUser } from "../../utils/fetch_users";
import AdminMain from "../../components/AdminMain/AdminMain";
import Nav from "../../components/Nav/Nav";
import OrderCard from "../../components/OrderCard/OrderCard";

import s from "../../styles/AdminOrdersPage.module.scss";

export default function AdminOrdersPage({ session }) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  //pagination
  const [totalOrders, setTotalOrders] = useState(0);
  const [skip, setSkip] = useState(0);

  const getAllOrders = useCallback(async () => {
    setLoading(true);
    const orders = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/order?skip=${skip}`
        : `http://localhost:3001/order?skip=${skip}`
    )
      .then((response) => response.json())
      .then((res) => {
        setOrders(res.orders);
        setTotalOrders(res.count);
        setLoading(false);
      })
      .catch((e) => {
        console.log("getAllOrders error:", e);
        setLoading(false);
      });

    return orders;
  }, [skip]);

  useEffect(() => {
    getAllOrders();
  }, [skip, getAllOrders]);

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
          ) : (
            orders &&
            orders.length > 0 &&
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                getAllOrders={getAllOrders}
              />
            ))
          )}
        </div>
        <div className={s.pagination_btn_wrapper}>
          <button
            type="button"
            onClick={() => {
              if (skip >= 15) {
                setSkip((prev) => prev - 15);
              }
            }}
            disabled={skip === 0}
          >
            {"<-"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (skip + 15 < totalOrders) {
                setSkip((prev) => prev + 15);
              }
            }}
            disabled={skip + 15 >= totalOrders}
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

  if (!session || user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
