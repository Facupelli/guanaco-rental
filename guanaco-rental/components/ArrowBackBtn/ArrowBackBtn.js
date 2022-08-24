import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import s from "./ArrowBackBtn.module.scss";
import { useRouter } from "next/router";

export default function ArrowBackBtn() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()} className={s.btn}>
      <FontAwesomeIcon icon={faArrowLeft} className={s.arrow_icon} />
    </button>
  );
}
