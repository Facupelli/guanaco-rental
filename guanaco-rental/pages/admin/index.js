import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import OrderCard from "../../components/OrderCard/OrderCard";

import s from "../../styles/AdminPage.module.scss";

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
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            orders &&
            orders.length > 0 &&
            orders.map((order, i) => <OrderCard order={order} i={i} />)
          )}
        </div>
      </main>
    </div>
  );
}
