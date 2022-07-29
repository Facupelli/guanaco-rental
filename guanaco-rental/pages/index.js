import Head from "next/head";
import Image from "next/image";
import Nav from "../components/Nav/Nav";
import styles from "../styles/Home.module.scss";

export default function Home() {
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

      <main className={styles.main}>
        <h1>GUANACO RENTAL</h1>
      </main>
    </div>
  );
}
