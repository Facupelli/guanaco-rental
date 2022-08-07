import Image from "next/image";
import s from "./Nav.module.scss";

export default function Nav({ setShowCart, cartPage }) {
  const handleShowCart = () => {
    setShowCart(true);
  };

  return (
    <nav className={s.nav_container}>
      <ul>
        <li className={s.logo_container}>
          <Image
            src="/guanaco-rental-logo.svg"
            width="75"
            height="75"
            objectFit="contain"
          />
        </li>
        <li>RESERVAS</li>
        <li>FAQ</li>
        <li>
          <a href="/api/auth/login">INICIAR SESION</a>
        </li>
        <li>REGISTRARSE</li>
        <li onClick={cartPage ? null : handleShowCart}>CARRITO</li>
      </ul>
    </nav>
  );
}
