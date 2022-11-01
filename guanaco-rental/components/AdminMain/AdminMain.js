import { useSession } from "next-auth/react";
import Link from "next/link";

import AdminNav from "../AdminNav/AdminNav";
import ArrowBackBtn from "../ArrowBackBtn/ArrowBackBtn";

import s from "./AdminMain.module.scss";

export default function AdminMain({ title, subtitle, link, children }) {
  const { data: session } = useSession();

  return (
    <main className={s.main}>
      {/* <div className={s.title_wrapper}>
        <ArrowBackBtn />
        <h1>{title}</h1>
      </div> */}
      <div className={s.flex}>
        <AdminNav narrow role={session?.user.role} />
        <div className={s.admin_max_width}>
          <div className={s.flex_col}>
            <div className={s.flex}>
              {!subtitle && (
                <h1>
                  {">"} {title}
                </h1>
              )}
              {subtitle && (
                <>
                  <Link href={`/admin/${link}`}>
                    <a className={`${subtitle ? s.active : ""}`}>
                      {">"} {title}
                    </a>
                  </Link>
                  <h1>
                    {">"} {subtitle}
                  </h1>
                </>
              )}
            </div>
            <div className={s.children_wrapper}>{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
