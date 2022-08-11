import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import OrderCard from "../../components/OrderCard/OrderCard";

import s from "../../styles/AdminUsersPage.module.scss";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getAllusers = async () => {
    setLoading(true);
    const users = await fetch("http://localhost:3001/users")
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
        {users && users.length > 0 && users.map((user) => <p>{user.email}</p>)}
      </main>
    </div>
  );
}
