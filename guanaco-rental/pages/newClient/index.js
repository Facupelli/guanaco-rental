import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import dynamic from "next/dynamic";

import Nav from "../../components/Nav/Nav";
import MessageModal from "../../components/MessageModal/MessageModal";
import LoadingModal from "../../components/LoadingModal/LoadingModal";

import s from "../../styles/NewClientPage.module.scss";

const CompleteProfileModal = dynamic(() =>
  import("../../components/CompleteProfileModal/CompleteProfileModal")
);

export default function NewClientPage({ loginModal }) {
  const [showModal, setShowModal] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(loginModal);

  return (
    <div>
      <Head>
        <title>Alta de Cliente</title>
        <link rel="icon" href="/logo-favicon.ico" />
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"
          async
        ></script>
      </Head>
      {showLoginModal && (
        <LoadingModal btnFunc={() => setShowLoginModal(false)}>
          <p>Para poder enviar tu alta de cliente debes iniciar sesión.</p>
          <div className={s.sesion_btns_wrapper}>
            <button
              className={s.link_icon_google}
              onClick={async() => await signIn("google")}
            >
              <p>ENTRAR CON</p>
              <p className={s.justify_between}>
                GOOGLE <FontAwesomeIcon icon={faGoogle} />
              </p>
            </button>
            <button
              className={s.link_icon_google}
              onClick={() => signIn("facebook")}
            >
              <p>ENTRAR CON</p>
              <p className={s.justify_between}>
                FACEBOOK <FontAwesomeIcon icon={faFacebook} />
              </p>
            </button>
          </div>
        </LoadingModal>
      )}
      {showModal && !showLoginModal && (
        <MessageModal showButton btnFunc={() => setShowModal(false)}>
          <p className={s.bold}>IMPORTANTE</p>
          <p>
            Para poder alquilar equipos es necesario llenar este formulario de
            alta de cliente. Una vez aprobado (puede demorar hasta 48hs) podras
            realizar tus reservas a través de la web.
          </p>
        </MessageModal>
      )}
      <Nav />
      <main className={s.main}>
        <CompleteProfileModal />
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
      props: {
        loginModal: true,
      },
    };
  }

  return {
    props: { session },
  };
}
