import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

//COMPONENTS
import SocialMediaIcons from "../components/Home/SocialMediaIcons/SocialMediaIcons";
import Nav from "../components/Nav/Nav";

import s from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={s.container}>
      <Head>
        <title>Guanaco Rental</title>
        <meta
          name="description"
          content="Guanaco rental web, alquiler de equipos para cine y fotografía. San Juan, Argentina."
        />
        <link rel="icon" href="/logo-favicon.ico" />
        {/* <link
          rel="preconnect"
          href="https://guanaco-rental-production.up.railway.app"
        /> */}
        <link
          rel="dns-prefetch"
          href="https://www.googletagmanager.com/gtag/"
        />
      </Head>

      <Script
        id="ga-script"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="ga-script2"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
            gtag('set', 'transport', 'beacon');
            gtag('send', 'pageview');
            gtag('js', new Date());
          `,
        }}
      />

      <Nav route="home" />

      <main className={s.main}>
        <section id="home">
          <div className={s.home_img_wrapper}>
            <div className={`${s.logo_img_wrapper} ${s.app_width}`}>
              <Image
                src="/homeImages/assets/home-logo.png"
                layout="responsive"
                height={3126}
                width={4088}
                objectFit="contain"
                quality={65}
              />
              <SocialMediaIcons width="30" />
              <div className={s.home_btns_wrapper}>
                <button type="button">
                  <Link href="/book">
                    <a> Reservá tu alquiler</a>
                  </Link>
                </button>
                <button type="button">
                  Conocé nuestro concepto de COMUNIDAD
                </button>
              </div>
            </div>
            <Image
              src="/homeImages/bg/camara-web.jpg"
              objectFit="cover"
              layout="fill"
              quality={65}
            />
          </div>
        </section>
        <section id="services" className={s.services_container}>
          <div className={s.app_width}>
            <h2>SERVICIOS</h2>
            <div className={s.services_wrapper}>
              <div>
                <div className={s.service_icon_wrapper}>
                  <svg
                    preserveAspectRatio="xMidYMid meet"
                    data-bbox="27.035 10.02 145.93 179.993"
                    viewBox="27.035 10.02 145.93 179.993"
                    xmlns="http://www.w3.org/2000/svg"
                    data-type="color"
                    role="presentation"
                    aria-hidden="true"
                    aria-labelledby="svgcid-nb5nrz2hbyjx"
                    fill="#d06021"
                    height="75"
                    width="75"
                  >
                    <title id="svgcid-nb5nrz2hbyjx"></title>
                    <g>
                      <path
                        d="M171.9 183l-68-72.5V43.9h4v8.6c0 1.5.8 3 2.2 3.6 2.9 1.3 5.8-.8 5.8-3.6V39.9c0-2.2-1.8-4-4-4h-8V14.2c0-1.9-1.3-3.7-3.1-4.1-2.6-.5-4.8 1.4-4.8 3.9v96.6l-67.9 72.5c-1.5 1.6-1.4 4.1.2 5.6.8.7 1.8 1.1 2.7 1.1 1.1 0 2.1-.2 2.9-1l28.3-29.9h75.6l28.3 29.9c1.5 1.6 4 1.6 5.6.1 1.6-1.7 1.7-4.3.2-5.9zM96 122.3v28.6H69.7L96 122.3zm8 28.5v-28.6l26.4 28.6H104z"
                        fill="#d06021"
                        // data-color="1"
                      ></path>
                    </g>
                  </svg>
                </div>
                <p>GRIP</p>
                <p>
                  Soluciones en grip y accesorios para rodajes de distintas
                  dimensiones.
                </p>
              </div>
              <div>
                <div className={s.service_icon_wrapper}>
                  <svg
                    preserveAspectRatio="xMidYMid meet"
                    data-bbox="36.5 29.499 127 141.001"
                    viewBox="36.5 29.499 127 141.001"
                    height="75"
                    width="75"
                    xmlns="http://www.w3.org/2000/svg"
                    data-type="shape"
                    role="presentation"
                    aria-hidden="true"
                    aria-labelledby="svgcid-gayohhrmzxo1"
                    fill="#d06021"
                  >
                    <title id="svgcid-gayohhrmzxo1"></title>
                    <g>
                      <path d="M163.126 85.006a3.966 3.966 0 0 0-3.595-2.306h-55.034l6.056-48.703a4.005 4.005 0 0 0-2.355-4.166 3.947 3.947 0 0 0-4.629 1.104l-66.146 79.8a4.024 4.024 0 0 0-.549 4.259 3.966 3.966 0 0 0 3.595 2.306h55.034l-6.056 48.703a4.005 4.005 0 0 0 2.355 4.166 3.95 3.95 0 0 0 4.628-1.104l66.146-79.8a4.023 4.023 0 0 0 .55-4.259zm-64.123 68.477 4.935-39.686a4.023 4.023 0 0 0-.962-3.145 3.956 3.956 0 0 0-2.976-1.353H48.956l52.041-62.783-4.935 39.686a4.023 4.023 0 0 0 .962 3.145A3.956 3.956 0 0 0 100 90.7h51.044l-52.041 62.783z"></path>
                    </g>
                  </svg>
                </div>
                <p>LUZ</p>
                <p>
                  Equipos específicos de cine y video versátiles, modernos y
                  variados.
                </p>
              </div>
              <div>
                <div className={s.service_icon_wrapper}>
                  <svg
                    preserveAspectRatio="xMidYMid meet"
                    data-bbox="23 49.5 153.999 101"
                    viewBox="23 49.5 153.999 101"
                    height="75"
                    width="75"
                    fill="#d06021"
                    xmlns="http://www.w3.org/2000/svg"
                    data-type="shape"
                    role="presentation"
                    aria-hidden="true"
                    aria-labelledby="svgcid--epz2to-eovhjy"
                  >
                    <title id="svgcid--epz2to-eovhjy"></title>
                    <g>
                      <path d="M174.829 63.229a3.999 3.999 0 0 0-4.155.303l-40.128 28.691V66.786c0-9.531-7.749-17.286-17.273-17.286h-73C30.748 49.5 23 57.255 23 66.786v66.428c0 9.531 7.748 17.286 17.272 17.286h73c9.524 0 17.273-7.755 17.273-17.286v-25.437l40.128 28.691a3.999 3.999 0 0 0 6.326-3.254V66.786a3.996 3.996 0 0 0-2.17-3.557zm-52.283 69.985c0 5.12-4.16 9.286-9.273 9.286h-73c-5.113 0-9.272-4.166-9.272-9.286V66.786c0-5.12 4.159-9.286 9.272-9.286h73c5.113 0 9.273 4.166 9.273 9.286v66.428zM169 125.437 133.423 100 169 74.563v50.874z"></path>
                    </g>
                  </svg>
                </div>
                <p>CÁMARAS Y LENTES</p>
                <p>
                  Dale un salto de calidad a tu producción con nuestro stock de
                  cámaras y lentes.
                </p>
              </div>
              <div>
                <div className={s.service_icon_wrapper}>
                  <svg
                    preserveAspectRatio="none"
                    data-bbox="49.5 23 101 154"
                    viewBox="49.5 23 101 154"
                    height="75"
                    width="50"
                    fill="#d06021"
                    xmlns="http://www.w3.org/2000/svg"
                    data-type="shape"
                    role="presentation"
                    aria-hidden="true"
                    aria-labelledby="svgcid-ha85cdk2ym44"
                  >
                    <title id="svgcid-ha85cdk2ym44"></title>
                    <g>
                      <path d="M100 123.909c13.194 0 23.929-10.726 23.929-23.909V46.909C123.929 33.726 113.194 23 100 23S76.071 33.726 76.071 46.909V100c0 13.184 10.735 23.909 23.929 23.909zm-15.929-77C84.071 38.137 91.217 31 100 31s15.929 7.137 15.929 15.909V100c0 8.772-7.146 15.909-15.929 15.909S84.071 108.772 84.071 100V46.909zM150.5 86.727V100c0 26.474-20.519 48.236-46.5 50.282V169h22.571a4 4 0 0 1 0 8H73.429a4 4 0 0 1 0-8H96v-18.718C70.019 148.236 49.5 126.474 49.5 100V86.727a4 4 0 0 1 8 0V100c0 23.41 19.065 42.455 42.5 42.455S142.5 123.41 142.5 100V86.727a4 4 0 0 1 8 0z"></path>
                    </g>
                  </svg>
                </div>
                <p>SONIDO</p>
                <p>
                  Corbateros, cañas, micrófonos direccionales y grabadoras de
                  sonido.
                </p>
              </div>
              <div>
                <div className={s.service_icon_wrapper}>
                  <svg
                    preserveAspectRatio="xMidYMid meet"
                    data-bbox="39 47.5 122 105"
                    viewBox="39 47.5 122 105"
                    height="75"
                    width="75"
                    fill="#d06021"
                    xmlns="http://www.w3.org/2000/svg"
                    data-type="color"
                    role="presentation"
                    aria-hidden="true"
                    aria-labelledby="svgcid-n30dlawihfum"
                  >
                    <title id="svgcid-n30dlawihfum"></title>
                    <g>
                      <path
                        d="M155.19 47.5v5.833h-11.619V47.5h-5.81V65H62.238V47.5h-5.81v5.833H44.81V47.5H39v105h5.81v-5.833h11.619v5.833h5.81V135h75.524v17.5h5.81v-5.833h11.619v5.833H161v-105h-5.81zm0 11.667v11.667h-11.619V59.167h11.619zm-11.619 52.5h11.619v11.667h-11.619v-11.667zm0-5.834V94.167h11.619v11.667h-11.619zm0-17.5V76.667h11.619v11.667h-11.619zm-87.142 0H44.81V76.667h11.619v11.666zm0 5.834v11.667H44.81V94.167h11.619zm0 17.5v11.667H44.81v-11.667h11.619zm0-52.5v11.667H44.81V59.167h11.619zM44.81 140.833v-11.667h11.619v11.667H44.81zm17.428-11.666V70.833h75.524v58.333H62.238zm81.333 11.666v-11.667h11.619v11.667h-11.619z"
                        fill="#d06021"
                        data-color="1"
                      ></path>
                    </g>
                  </svg>
                </div>
                <p>SERVICIOS DE PRODUCCIÓN</p>
                <p>
                  ¿Venís a filmar a San Juan? Hacemos más fácil tu viaje por el
                  desierto. ¡Consultanos!
                </p>
              </div>
            </div>
            <div className={s.faja_img_wrapper}>
              <Image
                src="/homeImages/assets/faja-logos-marcas.webp"
                layout="fill"
                objectFit="contain"
                quality={65}
              />
            </div>
          </div>
        </section>
        <section id="projects" className={s.projects_container}>
          <div className={s.app_width}>
            <h2>PROYECTOS</h2>
            <p>Algunos de los proyectos filmados con equipos del rental</p>
            <div className={s.grid}>
              <div className={s.grid_img_wrapper}>
                <Image
                  objectFit="cover"
                  layout="fill"
                  alt="lali_project"
                  src="/homeImages/projects/lali.jpg"
                  quality={65}
                />
              </div>
              <div className={s.grid_img_wrapper}>
                <Image
                  objectFit="cover"
                  layout="fill"
                  alt="living_project"
                  src="/homeImages/projects/living.jpg"
                  quality={65}
                />
              </div>
              <div className={s.grid_img_wrapper}>
                <Image
                  objectFit="cover"
                  layout="fill"
                  alt="abanico_project"
                  src="/homeImages/projects/abanico.jpg"
                  quality={65}
                />
              </div>
              <div className={s.grid_img_wrapper}>
                <Image
                  objectFit="cover"
                  layout="fill"
                  alt="sentada_project"
                  src="/homeImages/projects/sentada.jpg"
                  quality={65}
                />
              </div>
              <div className={s.grid_img_wrapper}>
                <Image
                  objectFit="cover"
                  layout="fill"
                  alt="patio_project"
                  src="/homeImages/projects/patio.jpg"
                  quality={65}
                />
              </div>
              <div className={s.grid_img_wrapper}>
                <Image
                  objectFit="cover"
                  layout="fill"
                  alt="violoncello_project"
                  src="/homeImages/projects/violoncello.jpg"
                  quality={65}
                />
              </div>
            </div>
            <div className={s.faja_img_wrapper}>
              <Image
                src="/homeImages/assets/faja-logos-clientes.webp"
                alt="faja_clientes"
                objectFit="contain"
                layout="fill"
                quality={65}
              />
            </div>
          </div>
        </section>
        <section id="us" className={s.us_container}>
          <div className={s.bg_img_wrapper}>
            <Image
              src="/homeImages/bg/ruta-web.jpg"
              objectFit="cover"
              layout="fill"
              alt="route_bg"
              quality={65}
            />
          </div>
          <div className={`${s.absolute} ${s.app_width}`}>
            <div className={s.flex_two_columns}>
              <div className={s.us_column}>
                <h2>NOSOTROS</h2>
                <p>
                  Somos un rental joven de equipos para cine y audiovisual. El
                  primero de San Juan. Impulsamos el sector creando espacios
                  para la comunidad audiovisual y creemos que trabajando juntos
                  vamos a llegar lejos.
                </p>
                <p>
                  Nuestra prioridad es que puedas llevarte lo que necesitás, y
                  poder ayudarte en todo momento. Sabemos cómo sobrevivir en el
                  desierto. Compartimos nuestra pasión por filmar con vos. ¡Te
                  esperamos!
                </p>
                <p>El equipo de Guanaco Rental.</p>
              </div>
              <div className={s.btns_column}>
                <button type="button">
                  <Link href="/book">
                    <a>Lista de Equipos Disponibles</a>
                  </Link>
                </button>
                <button type="button">
                  <Link
                    href="https://drive.google.com/file/d/1btblH9iNNgabi3uPw6gOmMTbJBelYrKP/view"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <a>Condiciones de Alquiler</a>
                  </Link>
                </button>
                <button type="button">
                  <Link href="/newClient">
                    <a>Alta de Cliente</a>
                  </Link>
                </button>
                <button type="button">
                  <Link href="/faq">
                    <a>Pregunta Frecuentes</a>
                  </Link>
                </button>
                <div className={s.white_logo_wrapper}>
                  <Image
                    src="/homeImages/assets/white-logo.png"
                    width={3333}
                    height={3333}
                    layout="responsive"
                    alt="white_logo"
                    quality={65}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className={s.contact_container}>
          <div className={s.app_width}>
            <div className={s.images_wrapper}>
              <div className={s.contact_img_wrapper}>
                <Image
                  src="/homeImages/assets/guanaco-alquila.png"
                  width={6000}
                  height={2851}
                  layout="responsive"
                  objectFit="contain"
                  alt="guanaco_alquila"
                  quality={65}
                />
              </div>
              <div className={s.contact_img_guanaco_wrapper}>
                <Image
                  src="/homeImages/assets/guanaco-literal.png"
                  layout="fill"
                  objectFit="contain"
                  alt="guanaco"
                  quality={65}
                />
              </div>
            </div>
            <div className={s.contact_card}>
              <div>
                <h2>CONTACTO</h2>
                <div>
                  <p>Whatsapp: +54 9 2645855761</p>
                  <p>hola@guanacorental.com</p>
                </div>
                <div>
                  <p>Ig: guanaco.rentalaudiovisual</p>
                  <p>Fb: Guanaco Rental</p>
                  <p>Youtube: /guanacorental</p>
                </div>
                <p>HORARIO:</p>
                <div>
                  <p>Retiros: 8am - 9am</p>
                  <p>Devoluciones: 9am - 10am</p>
                  <p>Domingo: Cerrado</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className={s.footer}>
          <SocialMediaIcons />
          <p>© 2021. Guanaco Rental. San Juan, Argentina.</p>
        </footer>
      </main>
    </div>
  );
}

// export const getServerSideProps = async (ctx) => {
//   const session = await unstable_getServerSession(
//     ctx.req,
//     ctx.res,
//     authOptions
//   );

//   let user;
//   if (session) {
//     const response = await getOrCreateUser(session.user);
//     user = response.user;
//   }

//   if (user && (user.petitionSent === "DENIED" || !user.petitionSent)) {
//     return {
//       redirect: {
//         destination: "/newClient",
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };
