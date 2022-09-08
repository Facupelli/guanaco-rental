import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { getUniqueUser } from "../../utils/fetch_users";
import { authOptions } from "../api/auth/[...nextauth]";
import { formatPrice, getOwnerEarnings } from "../../utils/price";
import AdminMain from "../../components/AdminMain/AdminMain";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminRentsPage.module.scss";

export default function AdminRents({ totalPrice, orders }) {
  const earnings = orders.map((order) => getOwnerEarnings(order));

  const federicoEarnings = earnings.reduce((curr, acc) => {
    return curr + acc.totalFederico;
  }, 0);

  const oscarEarnings = earnings.reduce((curr, acc) => {
    return curr + acc.totalOscar;
  }, 0);

  const totalFinishedOrders = () => {
    const today = new Date().getTime();
    const finishedOrders = orders.filter(
      (order) => new Date(order.booking.dates[order.booking.dates.length -1]).getTime() < today
    );
    const total = finishedOrders.reduce((curr, acc) => {
      curr + acc.totalPrice;
    }, 0);

    const eachEarnings = finishedOrders.map((order) => getOwnerEarnings(order));

    const federico = eachEarnings.reduce((curr, acc) => {
      return curr + acc.totalFederico;
    }, 0);

    const oscar = eachEarnings.reduce((curr, acc) => {
      return curr + acc.totalOscar;
    }, 0);

    return {
      total,
      federico,
      oscar,
    };
  };

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Rents</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <AdminMain title="Rentas">
        <h3>TODAS</h3>
        <p>TOTAL: {formatPrice(totalPrice)}</p>
        <p>Federico: {formatPrice(federicoEarnings)}</p>
        <p>Oscar: {formatPrice(oscarEarnings)}</p>

        <div>
          <h3>FINALIZADAS</h3>
          <p>TOTAL: {formatPrice(totalFinishedOrders().total)}</p>
          <p>Federico: {formatPrice(totalFinishedOrders().federico)}</p>
          <p>Oscar: {formatPrice(totalFinishedOrders().oscar)}</p>
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

  if (!session || user?.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const orders = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/order`
      : `http://localhost:3001/order`
  )
    .then((response) => response.json())
    .catch((e) => console.log("fecth error:", e));

  const totalPrice = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/order/rents`
      : `http://localhost:3001/order/rents`
  )
    .then((response) => response.json())
    .catch((e) => console.log("fecth error:", e));

  return {
    props: {
      session,
      totalPrice: totalPrice._sum.totalPrice,
      orders,
    },
  };
}
