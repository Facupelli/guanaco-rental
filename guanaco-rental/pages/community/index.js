import Head from "next/head";
import Image from "next/image";
import Footer from "../../components/Home/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import NavLink from "../../components/Nav/NavLink/NavLink";

import s from "../../styles/CommunityPage.module.scss";

export default function CommunityPage() {
  return (
    <div className={s.bg}>
      <Head>
        <title>Comunidad</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav>
        <li>
          <NavLink href="/faq" name="FAQ" />
        </li>
        <li>
          <NavLink href="/community" name="COMUNIDAD" />
        </li>
      </Nav>
      <main className={s.main}>
        <div className={s.bg_image_wrapper}>
          <Image
            src="/community/bg.jpg"
            layout="fill"
            alt="bg"
            objectFit="cover"
            priority
            quality={60}
          />
          <div className={s.content}>
            <h1>COMUNIDAD</h1>
            <div className={s.photo_gallery}>
              <div className={s.gallery_img}>
                <Image
                  src="/community/3.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="gallery_3"
                  quality={50}
                />
              </div>
              <div className={s.gallery_img}>
                <Image
                  src="/community/4.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="gallery_4"
                  quality={50}
                />
              </div>
              <div className={s.gallery_img}>
                <Image
                  src="/community/6.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="gallery_6"
                  quality={50}
                />
              </div>
              <div className={s.gallery_img}>
                <Image
                  src="/community/7.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="gallery_7"
                  quality={50}
                />
              </div>
              <div className={`${s.gallery_img} ${s.display_none}`}>
                <Image
                  src="/community/13.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="gallery_13"
                  quality={50}
                />
              </div>
              <div className={`${s.gallery_img} ${s.display_none}`}>
                <Image
                  src="/community/16.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="gallery_16"
                  quality={50}
                />
              </div>
            </div>
            <div className={s.text_card}>
              <h2>TALLERES DE GUANACO RENTAL</h2>
              <p>
                Creemos en el concepto de Comunidad más allá de los límites
                cliente-empresa. Es por esto, que impulsamos espacios de
                crecimiento personal y profesional para los integrantes de la
                industria audiovisual de San Juan y alrededores. Estos espacios
                no sólo resultan útiles para compartir conocimiento en materias
                específicas, sino que también generan redes laborales que
                potencian el sector reuniendo participantes con los mismos
                intereses pero diferentes capacidades.
              </p>
              <p>Creemos en el poder de las ideas, cuando se comparten.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
