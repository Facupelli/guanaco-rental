import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminMain from "../../components/AdminMain/AdminMain";
import ClientCard from "../../components/ClientCard/ClientCard";
import ClientPetitionCard from "../../components/clientPetitionCard/ClientPetitionCard";
import ClientPetitionInfo from "../../components/ClientPetitionCard/ClientPetitionInfo/ClientPetitionInfo";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminUsersPage.module.scss";

export default function AdminUsersPage({ clients, newCLients }) {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [showNewClients, setShowNewClients] = useState(true);
  const [showClients, setShowClients] = useState(false);

  const [newClientInfo, setNewClientInfo] = useState({});

  const [loading, setLoading] = useState(false);

  const [newClientUsers, setNewClientUsers] = useState(newCLients);
  const [clientUsers, setClientUsers] = useState(clients);

  const getNewClientUsers = async () => {
    setLoading(true);
    const users = await fetch(`http://localhost:3001/users?newClients=${true}`)
      .then((response) => response.json())
      .then((res) => {
        setNewClientUsers(res);
        setLoading(false);
      })
      .catch((e) => console.log("fecth error:", e));

    return users;
  };

  const getClientUsers = async () => {
    setLoading(true);
    const users = await fetch(
      `http://localhost:3001/users?clients=${true}&search=${search}`
    )
      .then((response) => response.json())
      .then((res) => {
        setClientUsers(res);
        setLoading(false);
      })
      .catch((e) => console.log("fecth error:", e));

    return users;
  };

  useEffect(() => {
    getClientUsers();
  }, [search]);

  return (
    <div className={s.bg_grey}>
      <Head>
        <title>Admin Usuarios</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <AdminMain title="Usuarios">
        <nav>
          <ul className={s.nav}>
            <li
              onClick={() => {
                setShowNewClients(true);
                setShowClients(false);
              }}
            >
              <div
                className={`${s.nav_li} ${
                  showNewClients ? s.nav_li_active : ""
                }`}
              >
                <p>Peticiones Alta de Cliente:</p>
                <p>{newClientUsers.length}</p>
              </div>
            </li>
            <li
              onClick={() => {
                setShowClients(true);
                setShowNewClients(false);
              }}
            >
              <div
                className={`${s.nav_li} ${showClients ? s.nav_li_active : ""}`}
              >
                <p>Lista de Clientes</p>
              </div>
            </li>
          </ul>
        </nav>

        {showNewClients && newClientUsers.length > 0 && (
          <section className={s.petitions_grid}>
            <div>
              {newClientUsers.map((user) => (
                <ClientPetitionCard
                  key={user.id}
                  user={user}
                  setNewClientInfo={setNewClientInfo}
                  newClientInfo={newClientInfo}
                />
              ))}
            </div>
            {newClientInfo.fullName && (
              <ClientPetitionInfo
                user={newClientInfo}
                getNewClientUsers={getNewClientUsers}
                setNewClientInfo={setNewClientInfo}
                getClientUsers={getClientUsers}
              />
            )}
          </section>
        )}
        {showClients && (
          <section className={s.client_list_wrapper}>
            <input
              type="search"
              placeholder="Buscar por nombre"
              onChange={(e) => setSearch(e.target.value)}
            />

            {clientUsers.length > 0 &&
              clientUsers.map((user) => (
                <ClientCard user={user} key={user.id} />
              ))}
          </section>
        )}
      </AdminMain>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session || session?.user.email !== "facundopellicer4@gmail.com") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const newCLients = await fetch(
    `http://localhost:3001/users?newClients=${true}`
  )
    .then((response) => response.json())
    .catch((e) => console.log("fecth error:", e));

  const clients = await fetch(`http://localhost:3001/users?clients=${true}`)
    .then((response) => response.json())
    .catch((e) => console.log("fecth error:", e));

  return {
    props: {
      newCLients,
      clients,
      session,
    },
  };
}
