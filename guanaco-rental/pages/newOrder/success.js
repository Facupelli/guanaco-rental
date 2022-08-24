import Link from "next/link";
import { useRouter } from "next/router";
import Nav from "../../components/Nav/Nav";
import Gear from "../../components/OrderCard/Gear/Gear";

import s from "../../styles/NewOrderSuccess.module.scss";

export default function NewOrderSuccess({ order }) {
  const router = useRouter();

  return (
    <div>
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
                {order.booking.dates[0]} {"->"}{" "}
                {order.booking.dates[order.booking.dates.length - 1]}
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
        <button type="button">
          <Link href="/">TERMINADO</Link>
        </button>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  const order = await fetch(`http://localhost:3001/order?id=${id}`)
    .then((response) => response.json())
    .catch((e) => console.log("fecth error:", e));

  return {
    props: {
      order,
    },
  };
}
