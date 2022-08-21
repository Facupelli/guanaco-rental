import Nav from "../../components/Nav/Nav";
import s from "../../styles/NewOrderSuccess.module.scss";

export default function NewOrderSuccess() {
  return (
    <div>
      <Nav />
      <main className={s.main}>
        <h1>PEDIDO SUCCESS</h1>
      </main>
    </div>
  );
}
