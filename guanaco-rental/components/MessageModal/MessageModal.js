import s from "./MessageModal.module.scss";

export default function MessageModal({ children, showButton, btnFunc }) {
  return (
    <aside className={s.modal_container}>
      {children}
      {showButton && (
        <div className={s.modal_btn}>
          <button type="button" onClick={btnFunc}>
            OK
          </button>
        </div>
      )}
    </aside>
  );
}
