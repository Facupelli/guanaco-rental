import Head from "next/head";
import Link from "next/link";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminPage.module.scss";

export default function AdminPage() {
  return (
    <div>
      <Head>
        <title>Guanaco Admin</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <main className={s.main}>
        <h1>Panel de Administrador</h1>
        <nav>
          <ul>
            <li>
              <Link href="/admin/orders">Pedidos</Link>
            </li>
            <li>
              <Link href="/admin/users">Usuarios</Link>
            </li>
            <li>
              <Link href="/admin/equipment">Equipos</Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}
