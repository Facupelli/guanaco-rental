import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./NavButton.module.scss";

export default function NavButton({ name, icon, handleOnClick }) {
  return (
    <button type="button" onClick={handleOnClick}>
      {name}
      <FontAwesomeIcon icon={icon} className={s.icon} />
    </button>
  );
}
