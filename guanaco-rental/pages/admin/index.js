import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminPage.module.scss";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    const orders = await fetch("http://localhost:3001/order")
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));

    return orders;
  };

  useEffect(() => {
    getAllOrders().then((res) => setOrders(res));
  }, []);

  return (
    <div>
      <Nav />
      <main className={s.main}>
        <h1>Pedidos</h1>
        <div>
          {orders &&
            orders.length > 0 &&
            orders.map((order) => (
              <p key={order.id}>
                {order.id} {order.totalPrice}
              </p>
            ))}
        </div>
      </main>
    </div>
  );
}
