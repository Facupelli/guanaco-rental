import Link from "next/link";

import s from "./NavLink.module.scss";

export default function NavLink({href, name}) {
  return (
    <Link href={href}>
      <a>{name}</a>
    </Link>
  );
}
