import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Bookeable from "../components/Bookeable/Bookeable";
import Nav from "../components/Nav/Nav";
import styles from "../styles/Home.module.scss";

export default function Home({ equipment }) {
  const { user, error, isLoading } = useUser();

  console.log("USER", user);
  console.log("EQUIPMENT", equipment);

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
