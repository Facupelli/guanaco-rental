import UserRow from "../UserRow/UserRow";

import s from "./UserTable.module.scss";

export default function UserTable({ users }) {
  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>Alta</th>
          <th>Nombre</th>
          <th>Tel</th>
          <th>DNI</th>
          <th>Provincia</th>
          <th>Pedidos</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
}
