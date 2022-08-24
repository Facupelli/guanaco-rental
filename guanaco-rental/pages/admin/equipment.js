import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useRouter } from "next/router";
import ArrowBackBtn from "../../components/ArrowBackBtn/ArrowBackBtn";
import GearAdminCard from "../../components/GearAdminCard/GearAdminCard";
import Nav from "../../components/Nav/Nav";

import s from "../../styles/AdminEquipmentPage.module.scss";

export default function AdminEquipment({ equipment }) {
  const router = useRouter();

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Equipment</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <main className={s.main}>
        <div className={s.title_wrapper}>
          <ArrowBackBtn />
          <div className={s.flex}>
            <h1>Equipos</h1>
            <p>total: {equipment.length}</p>
          </div>
        </div>
        <div>
          {equipment &&
            equipment.length > 0 &&
            equipment.map((gear) => (
              <GearAdminCard key={gear.id} gear={gear} />
            ))}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    // Getting user data from Auth0
    const user = getSession(context.req).user;

    if (user.email !== "facundopellicer4@gmail.com") {
      return {
        redirect: {
          destination: "/",
        },
      };
    }

    const equipment = await fetch(`http://localhost:3001/equipment`)
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));

    return {
      props: {
        equipment,
      },
    };
  },
});

