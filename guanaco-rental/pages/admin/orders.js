import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import OrderCard from "../../components/OrderCard/OrderCard";

import s from "../../styles/AdminOrdersPage.module.scss";

export default function AdminPage() {
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
        <h1>Pedidos</h1>
        <div className={s.table_titles}>
          <p>N°</p>
          <p>FECHA</p>
          <p>ALQUILER</p>
          <p>ESTADO</p>
          <p>EMAIL</p>
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
