import Image from "next/image";
import Link from "next/link";
import {
  faArrowRightFromBracket,
  faBars,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import NavButton from "./NavButton/NavButton";

import s from "./Nav.module.scss";

export default function Nav({ setShowCart, cartPage, route, children }) {
  const { data: session } = useSession();

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

          {children}

          {(session?.user.role === "ADMIN" ||
            session?.user.role === "EMPLOYEE") && (
            <li>
              <Link href="/admin">
                <a>ADMIN</a>
              </Link>
            </li>
          )}
          {session ? (
            <li>
              <NavButton
                name="SALIR"
                icon={faArrowRightFromBracket}
                handleOnClick={() => signOut()}
              />
            </li>
          ) : (
            <>
              <li>
                <button
                  className={s.google_sign}
                  onClick={async () => await signIn("google")}
                >
                  <div className={s.logo_wrapper}>
                    <Image
                      src="/google/g-logo.png"
                      width={18}
                      height={18}
                      alt="google g logo"
                    />
                  </div>
                  <p>Acceder con Google</p>
                </button>
              </li>
              <li>
                <button
                  className={s.facebook_sign}
                  onClick={() => signIn("facebook")}
                >
                  <div className={s.logo_wrapper}>
                    <FontAwesomeIcon icon={faFacebook} />
                  </div>
                  <p>Acceder con Facebook</p>
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
