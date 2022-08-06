import Head from "next/head";
import { useSelector } from "react-redux";
import Nav from "../../components/Nav/Nav";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);

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
      <main>
        {cart && cart.length > 0 && cart.map((item) => <p>{item.model}</p>)}
      </main>
    </div>
  );
}
