import Head from "next/head";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AdminMain from "../../components/AdminMain/AdminMain";
import Nav from "../../components/Nav/Nav";
import OrderCard from "../../components/OrderCard/OrderCard";

import s from "../../styles/AdminOrdersPage.module.scss";

export default function AdminOrdersPage() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    setLoading(true);
    const orders = await fetch("http://localhost:3001/order")
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
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </AdminMain>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session?.user.email !== "facundopellicer4@gmail.com") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      access: true,
    },
  };
}
