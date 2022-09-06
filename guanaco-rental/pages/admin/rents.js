import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { getUniqueUser } from "../../utils/fetch_users";
import { authOptions } from "../api/auth/[...nextauth]";
import { formatPrice, getOwnerEarnings } from "../../utils/price";
import AdminMain from "../../components/AdminMain/AdminMain";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminRents.module.scss";

export default function AdminRents({ totalPrice, orders }) {
  const earnings = orders.map((order) => getOwnerEarnings(order));

  const federicoEarnings = earnings.reduce((curr, acc) => {
    return curr + acc.totalFederico;
  }, 0);

  const oscarEarnings = earnings.reduce((curr, acc) => {
    return curr + acc.totalOscar;
  }, 0);


  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Rents</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <AdminMain title="Rentas">
        <p>TOTAL: {formatPrice(totalPrice)}</p>
        <p>Federico: {formatPrice(federicoEarnings)}</p>
        <p>Oscar: {formatPrice(oscarEarnings)}</p>
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
