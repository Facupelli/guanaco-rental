import Head from "next/head";
import Link from "next/link";
import Nav from "../../components/Nav/Nav";
import Gear from "../../components/OrderCard/Gear/Gear";

import s from "../../styles/NewOrderSuccess.module.scss";

export default function NewOrderSuccess({ order }) {
  return (
    <div className={s.bg_grey}>
      <Head>
        <title>Success - Guanaco Rental</title>
        <meta
          name="description"
          content="Guanaco rental web, alquiler de equipos para cine online. San Juan, Argentina."
        />
        <link rel="icon" href="/logo-favicon.ico" />
        <link
          rel="preconnect"
          href="https://guanaco-rental-production.up.railway.app"
        />
      </Head>
      <Nav />
      <main className={s.main}>
        <h1>PEDIDO ORDENADO CON EXITO</h1>
        {order && (
          <article>
            <div className={s.flex_20}>
              <p>{order.user.fullName}</p>
              <p>{order.user.dniNumber}</p>
              <p>{order.user.email}</p>
            </div>
            <div className={s.flex_20}>
              <p className={s.bold}>Fecha de alquiler:</p>
              <p>
                {new Date(order.booking.dates[0]).toLocaleDateString()} {"->"}{" "}
                {new Date(order.booking.dates.at(-1)).toLocaleDateString()}
              </p>
            </div>
            <div className={s.flex_60}>
              <p className={s.bold}>Equipos:</p>
              {order &&
                order.equipments.length > 0 &&
                order.equipments.map((gear) => (
                  <Gear key={gear.id} gear={gear} order={order} />
                ))}
            </div>
          </article>
        )}
        <Link href="/">
          <a>TERMINADO</a>
        </Link>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  const order = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/order?id=${id}`
      : `http://localhost:3001/order?id=${id}`
  )
    .then((response) => response.json())
    .catch((e) => console.log("fecth error:", e));

  return {
    props: {
      order,
    },
  };
}
