import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import CompleteProfileModal from "../../components/CompleteProfileModal/CompleteProfileModal";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/NewClientPage.module.scss";
import { authOptions } from "../api/auth/[...nextauth]";

export default function NewClientPage({ user }) {
  // useEffect(() => {
  //   if (user) {
  //     if (!userData) {
  //       getOrCreateUser(user).then((res) => dispatch(setUserId(res)));
  //     }
  //   }
  // }, [user]);

  return (
    <div>
      <Head>
        <title>Alta de Cliente</title>
        <link rel="icon" href="/logo-favicon.ico" />
        {/* <NextScript />
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
        ></script> */}
      </Head>
      <Nav />
      <main className={s.main}>
        <CompleteProfileModal user={user} />
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { user: session.user },
  };
}
