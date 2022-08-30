import {
  faArrowRightFromBracket,
  faBars,
  faCartShopping,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import s from "./Nav.module.scss";

export default function Nav({ setShowCart, cartPage, home }) {
  const handleShowCart = () => {
    if (home) {
      setShowCart(true);
    }
};

  const menuRef = useRef(null);

  useOnClickOutside(
    menuRef,
    useCallback(() => {
      document.getElementById("click").checked = false;
    },[])
  );

  const { data: session } = useSession();

  return (
    <nav className={s.nav_container}>
      <Link href="/">
        <div className={s.logo_container}>
          <div>
            <Image
              src="/guanaco-rental-logo.svg"
              alt="guanaco-logo"
              width={75}
              height={75}
              layout="intrinsic"
              objectFit="contain"
            />
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={cartPage ? null : handleShowCart}
        className={s.cart_btn}
      >
        <FontAwesomeIcon
          icon={faCartShopping}
          width="25px"
          className={s.cart_icon}
        />
      </button>
      <input type="checkbox" name="click" className={s.click} id="click" />
      <label htmlFor="click" className={s.icon_container}>
        <FontAwesomeIcon icon={faBars} width="25px" className={s.bars_icon} />
      </label>
      <ul ref={menuRef}>
        {/* <li>RESERVAS ONLINE</li> */}
        <li>FAQ</li>
        {session ? (
          <li>
            <button onClick={() => signOut()} className={s.link_icon}>
              CERRAR SESION
              <FontAwesomeIcon icon={faArrowRightFromBracket} width="20px" />
            </button>
          </li>
        ) : (
          <>
            <li>
              <button onClick={() => signIn()} className={s.link_icon}>
                INICIAR SESION
                <FontAwesomeIcon icon={faArrowRightToBracket} width="20px" />
              </button>
            </li>
            {/* <li>
              <Link href="/api/signup">
                <a>REGISTRARSE</a>
              </Link>
            </li> */}
          </>
        )}
        <li onClick={cartPage ? null : handleShowCart} className={s.link_icon}>
          CARRITO
          <FontAwesomeIcon icon={faCartShopping} width="20px" />
        </li>
        {session?.user.email === "facundopellicer4@gmail.com" && (
          <li>
            <Link href="/admin">ADMIN</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
