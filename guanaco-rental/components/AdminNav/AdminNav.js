import Link from "next/link";
import s from "./AdminNav.module.scss";

export default function AdminNav({ narrow, role }) {
  return (
    <nav className={`${s.nav_container}`}>
      <ul>
        <Link href="/admin">
          <li>
            <a className={s.link}>Calendario</a>
          </li>
        </Link>
        <Link href="/admin/orders">
          <li>
            <a className={s.link}>Pedidos</a>
          </li>
        </Link>
        <Link href="/admin/users">
          <li>
            <a className={s.link}>Usuarios</a>
          </li>
        </Link>
        <Link href="/admin/equipment">
          <li>
            <a className={s.link}>Equipos</a>
          </li>
        </Link>
        {role === "ADMIN" && (
          <>
            <Link href="/admin/rents">
              <li>
                <a className={s.link}>Rentas</a>
              </li>
            </Link>
            <Link href="/admin/coupons">
              <li>
                <a className={s.link}>Cupones</a>
              </li>
            </Link>
            <Link href="/admin/fixedDiscounts">
              <li>
                <a className={s.link}>Descuentos</a>
              </li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
