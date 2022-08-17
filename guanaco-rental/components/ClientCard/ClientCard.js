import s from "./ClientCard.module.scss";

export default function ClientCard({ user }) {
  return (
    <div className={s.card_container}>
      <p>{user.fullName}</p>
      <p>{user.phone}</p>
      <p>{user.bank}</p>
      <p>ALTA: {new Date(user.customerAprovedAt).toLocaleDateString()}</p>
    </div>
  );
}
