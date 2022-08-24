import { useUser } from "@auth0/nextjs-auth0";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import s from "./Nav.module.scss";

export default function Nav({ setShowCart, cartPage, home }) {
  const handleShowCart = () => {
    if (home) {
      setShowCart(true);
    }
  };

  const { user, error, isLoading } = useUser();

  return (
    <nav className={s.nav_container}>
      <div className={s.logo_container}>
        <div>
          <Link href="/">
            <Image
              src="/guanaco-rental-logo.svg"
              alt="guanaco-logo"
              width={75}
              height={75}
              layout="intrinsic"
              objectFit="contain"
            />
          </Link>
        </div>
      </div>
      <input type="checkbox" name="click" className={s.click} id="click" />
      <label htmlFor="click" className={s.icon_container}>
        <FontAwesomeIcon icon={faBars} width="25px" className={s.bars_icon} />
      </label>
      <ul>
        <li>RESERVAS ONLINE</li>
        <li>FAQ</li>
        {user ? (
          <li>
            <Link href="/api/auth/logout">
              <a>CERRAR SESION</a>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/api/auth/login">
                <a>INICIAR SESION</a>
              </Link>
            </li>
            <li>
              <Link href="/api/signup">
                <a>REGISTRARSE</a>
              </Link>
            </li>
          </>
        )}
        <li onClick={cartPage ? null : handleShowCart}>CARRITO</li>
        {user?.email === "facundopellicer4@gmail.com" && (
          <li>
            <Link href="/admin">ADMIN</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
