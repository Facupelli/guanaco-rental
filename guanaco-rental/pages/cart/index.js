import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import CartPageItem from "../../components/Bookeable/CartPageItem/CartPageItem";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/CartPage.module.scss";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  const date = useSelector((state) => state.date.date_range);

  return (
    <div>
      <Head>
        <title>Guanaco Rental</title>
        <meta
          name="description"
          content="Guanaco rental website, book filming equipment online. San Juan, Argentina."
        />
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <main className={s.main}>
        <div>
          <div className={s.table_titles}>
            <p>Equipos</p>
            <p>Cantidad</p>
            <p>Precio</p>
          </div>
          {cart &&
            cart.length > 0 &&
            cart.map((item) => <CartPageItem item={item} />)}
        </div>
        <div className={s.summary_wrapper}>
          <div className={s.summary}>
            {date && date.length > 0 ? (
              <div>
                <p>Retiro:</p>
                <p>{date && date.length > 0 && date[0]}</p>
                <p>Devolución:</p>
                <p>{date && date.length > 0 && date[1]}</p>
              </div>
            ) : (
              <button>Seleccionar Fecha</button>
            )}
            <button type="button" disabled={date.length <= 0 ? true : false}>
              agendar pedido
            </button>
            <Link href="/">
              <button type="button">continuar alquilando</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
