import Link from "next/link";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminPage.module.scss";

export default function () {
  return (
    <div>
      <Nav />
      <main className={s.main}>
        <h1>Panel de Administrador</h1>
        <ul>
          <li>
            <Link href="/admin/orders">Pedidos</Link>
          </li>
          <li>
            <Link href="/admin/users">Usuarios</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
