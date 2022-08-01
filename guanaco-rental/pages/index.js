import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import Image from "next/image";
import Nav from "../components/Nav/Nav";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const { user, error, isLoading } = useUser();

  console.log('USER', user)

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

      <main className={styles.main}></main>
    </div>
  );
}
