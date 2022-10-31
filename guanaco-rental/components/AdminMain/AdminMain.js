import { useSession } from "next-auth/react";

import AdminNav from "../AdminNav/AdminNav";
import ArrowBackBtn from "../ArrowBackBtn/ArrowBackBtn";

import s from "./AdminMain.module.scss";

export default function AdminMain({ title, children }) {
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
            <h1>
              {">"} {title}
            </h1>
            <div className={s.children_wrapper}>{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
