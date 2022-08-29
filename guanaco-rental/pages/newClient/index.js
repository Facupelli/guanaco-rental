import Head from "next/head";
import CompleteProfileModal from "../../components/CompleteProfileModal/CompleteProfileModal";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/NewClientPage.module.scss";

export default function NewClientPage() {
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
        {/* <CompleteProfileModal user={userData} />
         */}
        <CompleteProfileModal />
      </main>
    </div>
  );
}
