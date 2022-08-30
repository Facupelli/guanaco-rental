import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function XmarkButton({ handleClose, height }) {
  return (
    <button type="button" onClick={handleClose} aria-label="close_button">
      <FontAwesomeIcon icon={faXmark} height={height} />
    </button>
  );
}
