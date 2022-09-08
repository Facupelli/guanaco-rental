import s from "./RentsCard.module.scss";

export default function RentsCard({ children }) {
  return <div className={s.wrapper}>{children}</div>;
}
