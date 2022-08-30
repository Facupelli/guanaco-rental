import Head from "next/head";
import { useEffect, useState } from "react";
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

  const getAllOrders = async () => {
    setLoading(true);
    const orders = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/order`
        : "http://localhost:3001/order"
    )
      .then((response) => response.json())
      .then((res) => {
        setOrders(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log("getAllOrders error:", e);
        setLoading(false);
      });

    return orders;
  };

  useEffect(() => {
    getAllOrders();
  }, []);

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
          <p>PRECIO TOTAL</p>
        </div>
        <div>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            orders &&
            orders.length > 0 &&
            orders.map((order) => <OrderCard key={order.id} order={order} getAllOrders={getAllOrders} />)
          )}
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
