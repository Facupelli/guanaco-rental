import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminPage.module.scss";

export default function AdminPage({ access }) {
  const router = useRouter();

  useEffect(() => {
    if (!access) {
      router.push("/");
    }
  }, []);

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
              <Link href="/admin/orders">
                <a className={s.link}>Pedidos</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/users">
                <a className={s.link}>Usuarios</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/equipment">
                <a className={s.link}>Equipos</a>
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // Getting user data from Auth0
    const user = getSession(context.req).user;

    let access;

    if (user.email === "facundopellicer4@gmail.com") {
      access = true;
    } else {
      access = false;
    }

    return {
      props: { access },
    };
  },
});
