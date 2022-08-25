import { useCallback, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import s from "./MessageModal.module.scss";

export default function MessageModal({ children, showButton, btnFunc }) {
  const modalRef = useRef();

  useOnClickOutside(modalRef, useCallback(btnFunc));

  return (
    <aside className={s.modal_container} ref={modalRef}>
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
