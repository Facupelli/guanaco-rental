import Link from "next/link";
import s from "./AdminNav.module.scss";

export default function AdminNav({ narrow, role }) {
  console.log("NARROW", narrow, "ROLE", role);

  return (
    <nav className={`${s.nav_container} ${narrow ? s.margin : ""}`}>
      <ul>
        <Link href="/admin/orders">
          <li className={`${narrow ? s.padding_narrow : s.padding_default}`}>
            <a className={s.link}>Pedidos</a>
          </li>
        </Link>
        <Link href="/admin/users">
          <li className={`${narrow ? s.padding_narrow : s.padding_default}`}>
            <a className={s.link}>Usuarios</a>
          </li>
        </Link>
        {role === "ADMIN" && (
          <>
            <Link href="/admin/equipment">
              <li
                className={`${narrow ? s.padding_narrow : s.padding_default}`}
              >
                <a className={s.link}>Equipos</a>
              </li>
            </Link>
            <Link href="/admin/rents">
              <li
                className={`${narrow ? s.padding_narrow : s.padding_default}`}
              >
                <a className={s.link}>Rentas</a>
              </li>
            </Link>
            <Link href="/admin/coupons">
              <li
                className={`${narrow ? s.padding_narrow : s.padding_default}`}
              >
                <a className={s.link}>Cupones</a>
              </li>
            </Link>
            <Link href="/admin/fixedDiscounts">
              <li
                className={`${narrow ? s.padding_narrow : s.padding_default}`}
              >
                <a className={s.link}>Descuentos Fijos</a>
              </li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
