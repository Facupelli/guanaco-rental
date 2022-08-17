import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClientCard from "../../components/ClientCard/ClientCard";
import ClientPetitionCard from "../../components/clientPetitionCard/ClientPetitionCard";
import ClientPetitionInfo from "../../components/ClientPetitionCard/ClientPetitionInfo/ClientPetitionInfo";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminUsersPage.module.scss";

export default function AdminPage() {
  const router = useRouter();

  const [newClients, setNewClients] = useState(false);
  const [clients, setClients] = useState(false);

  const [newClientInfo, setNewClientInfo] = useState({});

  const [loading, setLoading] = useState(false);

  const [newClientUsers, setNewClientUsers] = useState([]);
  const [clientUsers, setClientUsers] = useState([]);

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

  useEffect(() => {
    getNewClientUsers();
    getClientUsers();
  }, []);

  return (
    <div>
      <Nav />
      <main className={s.main}>
        <div className={s.title_wrapper}>
          <button type="button" onClick={() => router.back()}>
            {"<-"}
          </button>
          <h1>Usuarios</h1>
        </div>
        <ul className={s.nav}>
          <li>
            <div className={s.nav_li}>
              <p
                onClick={() => {
                  setNewClients(true);
                  setClients(false);
                }}
              >
                Peticiones Alta de Cliente
              </p>
              <p>{newClientUsers.length}</p>
            </div>
          </li>
          <li
            onClick={() => {
              setClients(true);
              setNewClients(false);
            }}
          >
            <div className={s.nav_li}>
              <p>Lista de Clientes</p>
            </div>
          </li>
        </ul>
        {newClients && newClientUsers.length > 0 && (
          <div className={s.petitions_grid}>
            <div>
              {newClientUsers.map((user) => (
                <ClientPetitionCard
                  user={user}
                  setNewClientInfo={setNewClientInfo}
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
        {clients &&
          clientUsers.length > 0 &&
          clientUsers.map((user) => <ClientCard user={user} />)}
      </main>
    </div>
  );
}
