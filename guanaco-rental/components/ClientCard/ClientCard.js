import s from "./ClientCard.module.scss";

export default function ClientCard({ user }) {
  return (
    <div className={s.card_container}>
      <p>{user.fullName}</p>
      <p>{user.email}</p>
    </div>
  );
}
