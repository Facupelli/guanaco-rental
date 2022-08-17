import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import OrderCard from "../../components/OrderCard/OrderCard";

import s from "../../styles/AdminOrdersPage.module.scss";

export default function AdminPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    setLoading(true);
    const orders = await fetch("http://localhost:3001/order")
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));

    return orders;
  };

  useEffect(() => {
    getAllOrders().then((res) => {
      setOrders(res);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Nav />
      <main className={s.main}>
        <div className={s.title_wrapper}>
          <button type="button" onClick={() => router.back()}>
            {"<-"}
          </button>
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
          <p>EQUIPO</p>
          <p>PRECIO TOTAL</p>
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            orders &&
            orders.length > 0 &&
            orders.map((order, i) => (
              <OrderCard key={order.id} order={order} i={i} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}