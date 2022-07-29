import Image from "next/image";
import s from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={s.nav_container}>
      <ul>
        <li className={s.logo_container}>
          <Image
            src="/guanaco-rental-logo.svg"
            width="50"
            height="50"
            objectFit="contain"
          />
        </li>
        <li>RESERVAS</li>
        <li>INICIAR SESION</li>
        <li>REGISTRARSE</li>
      </ul>
    </nav>
  );
}
