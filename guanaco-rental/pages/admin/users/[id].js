import Head from "next/head";
import Image from "next/image";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useState } from "react";

import Nav from "../../../components/Nav/Nav";
import ArrowBackBtn from "../../../components/ArrowBackBtn/ArrowBackBtn";
import MessageModal from "../../../components/MessageModal/MessageModal";

import s from "../../../styles/AdminUserProfilePage.module.scss";

export default function UserProfile({ userData }) {
  const [user, setUser] = useState(userData);

  const { data: session } = useSession();

  const [dniUrl, setDniUrl] = useState();

  const reFetchUser = async () => {
    const userData = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/users/${user.id}`
        : `http://localhost:3001/users/${user.id}`,
      { headers: { authorization: `${session?.user.token}` } }
    )
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));

    return userData;
  };

  const handleClickBanUser = async () => {
    const response = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/users`
        : "http://localhost:3001/users",
      {
        method: "PUT",
        body: JSON.stringify({
          userId: user.id,
          operation: "BAN",
          customerApproved: false,
          petitionSent: "DENIED",
        }),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          authorization: `${session?.user.token}`,
        },
      }
    );
    const newFixedDiscount = await response.json();

    if (newFixedDiscount.message === "success") {
      const updatedUser = await reFetchUser();
      setUser(updatedUser.user);
    }
  };

  return (
    <div className={s.bg_grey}>
      <Head>
        <title>Admin Usuarios</title>
        <link rel="icon" href="/logo-favicon.ico" />
        <link
          rel="preconnect"
          href="https://www.guanacorental.shop/rentalapi"
        />
      </Head>
      <Nav />
      {dniUrl && (
        <MessageModal btnFunc={() => setDniUrl("")}>
          <div className={s.image_wrapper}>
            <Image
              src={dniUrl}
              alt={dniUrl}
              width={400}
              height={400}
              objectFit="contain"
              layout="responsive"
            />
          </div>
        </MessageModal>
      )}
      <main>
        <ArrowBackBtn />
        {user && (
          <>
            <div className={s.user_info_card}>
              <div className={s.fullName_wrapper}>
                <p>{user.fullName}</p>
                <div className={s.btns_wrapper}>
                  <button
                    type="button"
                    onClick={() => setDniUrl(user.dni.dniFront)}
                  >
                    dni frente
                  </button>
                  <button
                    type="button"
                    onClick={() => setDniUrl(user.dni.dniBack)}
                  >
                    dni reverso
                  </button>
                </div>
              </div>
              <ul>
                <div>
                  <li>Alta:</li>
                  <li>
                    {new Date(user.customerApprovedAt).toLocaleDateString()}
                  </li>
                </div>
                <div>
                  <li>DNI:</li>
                  <li>{user.dniNumber}</li>
                </div>
                <div>
                  <li>Celular:</li>
                  <li>{user.phone}</li>
                </div>
                <div>
                  <li>Domicilio:</li>
                  <li>{user.address}</li>
                </div>
                <div>
                  <li>Localidad:</li>
                  <li>{user.addressLocation}</li>
                </div>
                <div>
                  <li>Provincia:</li>
                  <li>{user.addressProvince}</li>
                </div>
              </ul>
            </div>
            <div className={s.user_info_job_card}>
              <ul>
                <div>
                  <li>Ocupacion:</li>
                  <li>{user.occupation}</li>
                </div>
                <div>
                  <li>Estudiante:</li>
                  <li>{user.student ? "SI" : "NO"}</li>
                </div>
                <div>
                  <li>Empleado:</li>
                  <li>{user.employee ? "SI" : "NO"}</li>
                </div>
                <div>
                  <li>Empresa:</li>
                  <li>{user.company ? user.company : "-"}</li>
                </div>
                <div>
                  <li>CUIT:</li>
                  <li>{user.cuit}</li>
                </div>
                <div>
                  <li>Razon Social:</li>
                  <li>{user.bussinessName ? user.bussinessName : "-"}</li>
                </div>
              </ul>
            </div>
            <div className={s.user_info_bank_card}>
              <h3>Banco</h3>
              <ul>
                <div>
                  <li>Banco:</li>
                  <li>{user.bank}</li>
                </div>
                <div>
                  <li>Alias:</li>
                  <li>{user.alias}</li>
                </div>
                <div>
                  <li>CBU:</li>
                  <li>{user.cbu}</li>
                </div>
              </ul>
            </div>
            <div className={s.user_info_orders_card}>
              <h3>Pedidos</h3>
              {user.orders.length === 0 ? (
                `${user.fullName} no ha hecho ningun pedido.`
              ) : (
                <p>{user.orders.map((order) => order.number).join(", ")}</p>
              )}
            </div>
            <div className={`${s.user_info_orders_card} ${s.danger_div}`}>
              <h3>Banear Usuario</h3>
              <p>El usuario no podrá realizar pedidos por la app.</p>
              <button
                onClick={handleClickBanUser}
                disabled={user.petitionSent === "DENIED"}
              >
                {user.petitionSent === "DENIED" ? "usuario baneado" : "banear"}
              </button>
            </div>
          </>
        )}
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

  const id = ctx.params.id;

  if (session?.user.role === "ADMIN" || session?.user.role === "EMPLOYEE") {
    const userData = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/users/${id}`
        : `http://localhost:3001/users/${id}`,
      { headers: { authorization: `${session?.user.token}` } }
    )
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));

    return {
      props: {
        userData: userData.user,
        session,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
    },
  };
}
