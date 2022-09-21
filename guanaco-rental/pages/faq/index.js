import Head from "next/head";
import Nav from "../../components/Nav/Nav";
import NavLink from "../../components/Nav/NavLink/NavLink";
import s from "../../styles/FaqPage.module.scss";

export default function FaqPage() {
  return (
    <div>
      <Head>
        <title>Guanaco FAQ</title>
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
        <h1>FAQ</h1>
        <ul className={s.index}>
          <li>¿CÓMPO PUEDO ALQUILAR EN GUANACO RENTAL?</li>
          <li>¿CUÁNTO DURA UNA JORNADA DE ALQUILER?</li>
          <li>¿CÓMO Y CUÁNTO TENGO QUE PAGAR?</li>
          <li>¿HACEN DESCUENTOS? ¿CÓMO ACCEDO?</li>
          <li>¿SI VOY A RODAR MUY TEMPRANO PUEDO RETIRAR EL DÍA ANTERIOR?</li>
          <li>
            ¿PUEDO VIAJAR CON LOS EQUIPOS A OTROS DEPARTAMENTOS, PROVINICIAS?
          </li>
          <li>¿CÓMO MANEJAN EL TEMA SEGURO DE EQUIPOS?</li>
          <li>¿PUEDE RETIRAR O DEVOLVER OTRA PERSONA A MI NOMBRE?</li>
        </ul>
        <div className={s.answers}>
          <div>
            <p className={s.q_title}>
              ¿CÓMPO PUEDO ALQUILAR EN GUANACO RENTAL?
            </p>
            <p>
              Registrándote en Guanacorental.com vas a poder hacer tu pedido en
              cualquier momento! Luego que aceptemos tu formulario de alta de
              cliente vas a poder llenar tu carrito para generar el alquiler.
              Cualquier consulta no dudes en escribirnos por whastapp.
            </p>
          </div>
          <div>
            <p className={s.q_title}>¿CUÁNTO DURA UNA JORNADA DE ALQUILER?</p>
            <p>
              La jornada de alquiler tiene una duración de 24hs, se retira a las
              9am y se devuelve a las 9am del día posterior. Ante cualquier
              necesidad especial, se aclarará al momento de alquilar. El precio
              que vas a ver de cada ítem en la lista, corresponde a una jornada.
            </p>
          </div>
          <div>
            <p className={s.q_title}>¿CÓMO Y CUÁNTO TENGO QUE PAGAR?</p>
            <p>
              Recibimos efectivo, y dependiendo del monto podemos cobrar con
              transferencia bancaria, mercado pago o similares.
            </p>
          </div>
          <div>
            <p className={s.q_title}>¿HACEN DESCUENTOS? ¿CÓMO ACCEDO?</p>
            <p>
              Hacemos descuentos a estudiantes, proyectos independientes y
              también dependiendo de la cantidad de días y equipos que alquiles.
              ¡Consultanos por tu proyecto en particular vía Whatsapp!
            </p>
          </div>
          <div>
            <p className={s.q_title}>
              ¿SI VOY A RODAR MUY TEMPRANO PUEDO RETIRAR EL DÍA ANTERIOR?
            </p>
            <p>
              En caso de que los equipos no estén reservados por otro cliente se
              pueden retirar el día previo a las 20hs.
            </p>
          </div>
          <div>
            <p className={s.q_title}>
              ¿PUEDO VIAJAR CON LOS EQUIPOS A OTROS DEPARTAMENTOS, PROVINCIAS?
            </p>
            <p>
              Si, pero nos tenés que avisar al momento de reservar. En este caso
              será obligatorio un seguro de filmación y algunos requisitos
              extra.
            </p>
          </div>
          <div>
            <p className={s.q_title}>
              ¿CÓMO MANEJAN EL TEMA SEGURO DE EQUIPOS?
            </p>
            <p>
              El valor del alquiler NO incluye ningún tipo de seguro, aunque
              recomendamos contratar uno. Guanaco Rental pone a disposición
              datos de contacto de un seguro de confianza como así también
              números de serie, descripción y fotografías de los equipos para la
              correcta contrata- ción de un seguro. En caso de que el
              responsable del rental defina por cantidad o valor de equipos
              retirados la operación como “de riesgo”, se exigirá sin excepción
              la contratación de un seguro de filmación, teniendo que presentar
              la póliza para retirar.
            </p>
          </div>
          <div>
            <p className={s.q_title}>
              ¿PUEDE RETIRAR O DEVOLVER OTRA PERSONA A MI NOMBRE?
            </p>
            <p>
              Es obligatorio que retire la misma persona que hizo la
              reserva.Tampoco se pueden hacer reservas a nombre de otra persona
              que ya haya alquilado con nosotros.
            </p>
          </div>
        </div>
        <p>
          Recordá que siempre estamos a disposición vía Whatsapp para responder
          todas tus consultas. ¡FELIZ RODAJE!
        </p>
      </main>
    </div>
  );
}
