import s from "./MessageModal.module.scss";

export default function MessageModal({ children }) {
  return <aside className={s.modal_container}>{children}</aside>;
}
