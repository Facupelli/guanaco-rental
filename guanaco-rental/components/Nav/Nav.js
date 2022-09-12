import {
  faArrowRightFromBracket,
  faBars,
  faCartShopping,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import s from "./Nav.module.scss";

export default function Nav({ setShowCart, cartPage, route, role }) {
  const { data: session } = useSession();
  const userRole = useSelector((state) => state.user.data?.role);

  const handleShowCart = () => {
    if (route === "book") {
      setShowCart(true);
    }
  };

  const menuRef = useRef(null);

  useOnClickOutside(
    menuRef,
    useCallback(() => {
      document.getElementById("click").checked = false;
    }, [])
  );

  return (
    <header>
      <nav className={s.nav_container}>
        <Link href="/book">
          <div className={s.logo_container}>
            <div>
              <Image
                src="/guanaco-rental-logo.svg"
                alt="guanaco-logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </Link>
        {route !== "home" && (
          <button
            type="button"
            onClick={cartPage ? null : handleShowCart}
            className={s.cart_btn}
            aria-label="cart_button"
          >
            <FontAwesomeIcon icon={faCartShopping} className={s.cart_icon} />
          </button>
        )}
        <input type="checkbox" name="click" className={s.click} id="click" />
        <label htmlFor="click" className={s.icon_container}>
          <FontAwesomeIcon icon={faBars} className={s.bars_icon} />
        </label>
        <ul ref={menuRef}>
          <li>
            <Link href="/">
              <a>INICIO</a>
            </Link>
          </li>
          <li>
            <Link href="/book">
              <a>RESERVAS ONLINE</a>
            </Link>
          </li>
          {route === "home" && (
            <>
              <li>
                <Link href="/faq">
                  <a>FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="/community">
                  <a>COMUNIDAD</a>
                </Link>
              </li>
            </>
          )}
          {route !== "home" && route !== "faq" && route !== "community" && (
            <li
              onClick={cartPage ? null : handleShowCart}
              className={s.link_icon}
            >
              CARRITO
              <FontAwesomeIcon icon={faCartShopping} className={s.icon} />
            </li>
          )}
          {(userRole === "ADMIN" || userRole === "EMPLOYEE") && (
            <li>
              <Link href="/admin">
                <a>ADMIN</a>
              </Link>
            </li>
          )}
          {session ? (
            <li>
              <button onClick={() => signOut()} className={s.link_icon}>
                SALIR
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className={s.icon}
                />
              </button>
            </li>
          ) : (
            <>
              <li>
                {/* <button onClick={() => signIn()} className={s.link_icon}>
                INICIAR SESION
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className={s.icon}
                />
              </button> */}
                <button
                  className={s.link_icon_google}
                  onClick={() => signIn("google")}
                >
                  <p>ENTRAR CON</p>
                  <p className={s.justify_between}>
                    GOOGLE <FontAwesomeIcon icon={faGoogle} />
                  </p>
                </button>
              </li>
              <li>
                <button className={s.link_icon_google}>
                  <p>ENTRAR CON</p>
                  <p className={s.justify_between}>
                    FACEBOOK <FontAwesomeIcon icon={faFacebook} />
                  </p>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
