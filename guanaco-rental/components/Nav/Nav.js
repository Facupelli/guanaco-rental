import { useUser } from "@auth0/nextjs-auth0";
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
      <ul>
        <li className={s.logo_container}>
          <Link href="/">
            <div>
              <Image
                src="/guanaco-rental-logo.svg"
                width="75"
                height="75"
                objectFit="contain"
              />
            </div>
          </Link>
        </li>
        <li>RESERVAS ONLINE</li>
        <li>FAQ</li>
        {user ? (
          <li>
            <a href="/api/auth/logout">CERRAR SESION</a>
          </li>
        ) : (
          <>
            <li>
              <a href="/api/auth/login">INICIAR SESION</a>
            </li>
            <li>
              <a href="/api/signup">REGISTRARSE</a>
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
