import { useEffect, useState } from "react";
import ClientPetitionCard from "../../components/clientPetitionCard/ClientPetitionCard";
import ClientPetitionInfo from "../../components/ClientPetitionCard/ClientPetitionInfo/ClientPetitionInfo";
import Nav from "../../components/Nav/Nav";
import OrderCard from "../../components/OrderCard/OrderCard";

import s from "../../styles/AdminUsersPage.module.scss";

export default function AdminPage() {
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
        <h1>Usuarios</h1>
        <ul className={s.nav}>
          <li>
            <p
              onClick={() => {
                setNewClients(true);
                setClients(false);
              }}
            >
              Peticiones Alta de Cliente
            </p>
          </li>
          <li
            onClick={() => {
              setClients(true);
              setNewClients(false);
            }}
          >
            <p>Lista de Clientes</p>
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
              />
            )}
          </div>
        )}
        {clients &&
          clientUsers.length > 0 &&
          clientUsers.map((user) => (
            <div>
              <p>{user.email}</p>
            </div>
          ))}
      </main>
    </div>
  );
}
