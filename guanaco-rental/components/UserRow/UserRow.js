import { useRouter } from "next/router";

import s from "./UserRow.module.scss";

export default function UserRow({ user }) {
  const router = useRouter();

  const handleClickUser = (userId) => {
    router.push(`/admin/users/${userId}`);
  };

  return (
    <tr className={s.row} onClick={() => handleClickUser(user.id)}>
      <td>
        {new Date(user.customerApprovedAt).toLocaleDateString("es-AR", {
          year: "numeric",
          day: "numeric",
          month: "short",
        })}
      </td>
      <td>{user.fullName}</td>
      <td>{user.phone}</td>
      <td>{user.dniNumber}</td>
      <td>{user.addressProvince}</td>
      <td>{user.orders?.length}</td>
    </tr>
  );
}
