import s from "./ClientCard.module.scss";

export default function ClientCard({ user }) {
  return (
    <div className={s.card_container}>
      <p>{user.fullName}</p>
      <p>tel: {user.phone}</p>
      <p>dni: {user.dniNumber}</p>
      <p>{user.addressProvince}</p>
      <p>Pedidos: {user.orders.length}</p>
      <p className={s.alta}>ALTA: {new Date(user.customerAprovedAt).toLocaleDateString()}</p>
    </div>
  );
}
