import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { useEffect } from "react";
import Bookeable from "../components/Bookeable/Bookeable";
import Nav from "../components/Nav/Nav";
import styles from "../styles/Home.module.scss";
import { setEquipment } from "../redux/features/equipment/equipmentSlice";

export default function Home({ equipment }) {
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();

  // console.log("USER", user);

  // useEffect(() => {
  //   dispatch(setEquipment(equipment));
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Guanaco Rental</title>
        <meta
          name="description"
          content="Guanaco rental website, book filming equipment online. San Juan, Argentina."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Bookeable equipment={equipment} />

      <main className={styles.main}></main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const equipment = await fetch("http://localhost:3001/equipment").then(
    (response) => response.json()
  );

  return {
    props: {
      equipment,
    },
  };
};
