import Head from "next/head";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth";
import { getUniqueUser } from "../../utils/fetch_users";
import { authOptions } from "../api/auth/[...nextauth]";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminPage.module.scss";

export default function AdminPage({ session }) {
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
            <Link href="/admin/orders">
              <li>
                <a className={s.link}>Pedidos</a>
              </li>
            </Link>
            <Link href="/admin/users">
              <li>
                <a className={s.link}>Usuarios</a>
              </li>
            </Link>
            <Link href="/admin/equipment">
              <li>
                <a className={s.link}>Equipos</a>
              </li>
            </Link>
          </ul>
        </nav>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  const user = await getUniqueUser(session?.user.email)

  if (!session || user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { session },
  };
}
