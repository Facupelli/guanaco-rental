import { useEffect, useState } from "react";
import ClientPetitionCard from "../../components/clientPetitionCard/ClientPetitionCard";
import Nav from "../../components/Nav/Nav";
import OrderCard from "../../components/OrderCard/OrderCard";

import s from "../../styles/AdminUsersPage.module.scss";

export default function AdminPage() {
  const [newClients, setNewClients] = useState(false);
  const [clients, setClients] = useState(false);

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getAllusers = async () => {
    setLoading(true);
    const users = await fetch(`http://localhost:3001/users?newClients=${true}`)
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));

    return users;
  };

  useEffect(() => {
    getAllusers().then((res) => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Nav />
      <main className={s.main}>
        <h1>Usuarios</h1>
        <ul className={s.nav}>
          <li>
            <p onClick={() => setNewClients(!newClients)}>
              Peticiones Alta de Cliente
            </p>
          </li>
          <li onClick={() => setClients(!clients)}>
            <p>Lista de Clientes</p>
          </li>
        </ul>
        {newClients &&
          users &&
          users.length > 0 &&
          users.map((user) => <ClientPetitionCard user={user} />)}
      </main>
    </div>
  );
}
