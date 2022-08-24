import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useEffect, useState } from "react";
import ArrowBackBtn from "../../components/ArrowBackBtn/ArrowBackBtn";
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
      <main className={s.main}>
        <div className={s.title_wrapper}>
          <ArrowBackBtn />
          <h1>Pedidos</h1>
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
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // Getting user data from Auth0
    const user = getSession(context.req).user;

    if (user.email !== "facundopellicer4@gmail.com") {
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
  },
});
