import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClientCard from "../../components/ClientCard/ClientCard";
import ClientPetitionCard from "../../components/clientPetitionCard/ClientPetitionCard";
import ClientPetitionInfo from "../../components/ClientPetitionCard/ClientPetitionInfo/ClientPetitionInfo";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminUsersPage.module.scss";

export default function AdminUsersPage({ clients, newCLients }) {
  const router = useRouter();

  const [showNewClients, setShowNewClients] = useState(false);
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
    const users = await fetch(`http://localhost:3001/users?clients=${true}`)
      .then((response) => response.json())
      .then((res) => {
        setClientUsers(res);
        setLoading(false);
      })
      .catch((e) => console.log("fecth error:", e));

    return users;
  };

  // useEffect(() => {
  //   getNewClientUsers();
  //   getClientUsers();
  // }, []);

  return (
    <div>
      <Head>
        <title>Admin Usuarios</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <main className={s.main}>
        <div className={s.title_wrapper}>
          <button type="button" onClick={() => router.back()}>
            {"<-"}
          </button>
          <h1>Usuarios</h1>
        </div>
        <ul className={s.nav}>
          <li
            onClick={() => {
              setShowNewClients(true);
              setShowClients(false);
            }}
          >
            <div
              className={`${s.nav_li} ${showNewClients ? s.nav_li_active : ""}`}
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
        {showNewClients && newClientUsers.length > 0 && (
          <div className={s.petitions_grid}>
            <div>
              {newClientUsers.map((user) => (
                <ClientPetitionCard
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
          </div>
        )}
        {showClients &&
          clientUsers.length > 0 &&
          clientUsers.map((user) => <ClientCard user={user} />)}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
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
    },
  };
}
