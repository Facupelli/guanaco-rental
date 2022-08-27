import ArrowBackBtn from "../ArrowBackBtn/ArrowBackBtn";
import s from "./AdminMain.module.scss";

export default function AdminMain({ title, children }) {
  return (
    <main className={s.main}>
      <div className={s.title_wrapper}>
        <ArrowBackBtn />
        <h1>{title}</h1>
      </div>
      {children}
    </main>
  );
}
