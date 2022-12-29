import s from "./LoadingModal.module.scss";

export default function LoadingModal({ children }) {
  return;
  <>
    <aside className={s.modal_container}>{children}</aside>;
    <div className={s.backdrop}></div>
  </>;
}
