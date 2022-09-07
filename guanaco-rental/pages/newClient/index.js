import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import MessageModal from "../../components/MessageModal/MessageModal";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/NewClientPage.module.scss";

const CompleteProfileModal = dynamic(() => import("../../components/CompleteProfileModal/CompleteProfileModal"))

export default function NewClientPage({ user }) {
  const [showModal, setShowModal] = useState(true);

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
      {showModal && (
        <MessageModal showButton btnFunc={() => setShowModal(false)}>
          <p className={s.bold}>IMPORTANTE</p>
          <p>
            Para poder alquilar equipos es necesario llenar este formulario de
            alta de cliente. Una vez aprobado (puede demorar hasta 48hs)
            podras realizar tus reservas a través de la web.
          </p>
        </MessageModal>
      )}
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
