import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import {
  useFetchClients,
  useFetchNewClients,
} from "../../../hooks/useFetchUsers";

import AdminMain from "../../../components/AdminMain/AdminMain";
import ClientCard from "../../../components/ClientCard/ClientCard";
import ClientPetitionCard from "../../../components/ClientPetitionCard/ClientPetitionCard";
import ClientPetitionInfo from "../../../components/ClientPetitionCard/ClientPetitionInfo/ClientPetitionInfo";
import Nav from "../../../components/Nav/Nav";
import PaginationArrows from "../../../components/Pagination/PaginationArrows";

import s from "../../../styles/AdminUsersPage.module.scss";

export default function AdminUsersPage({ clients, newClients, admins }) {
  const router = useRouter();

  const { data: session } = useSession();

  const [showNewClients, setShowNewClients] = useState(false);
  const [showClients, setShowClients] = useState(true);
  const [showAdmins, setShowAdmins] = useState(false);

  const [newClientInfo, setNewClientInfo] = useState({});

  const [adminUsers, setAdminUsers] = useState(admins);

  const [skip, setSkip] = useState(0);

  const {
    clientUsers,
    totalUsers,
    clientsLoading,
    search,
    setSearch,
    refetchClients,
  } = useFetchClients(clients, skip, session?.user.token);

  const { newClientUsers, newClientsLoading, refetchNewClients } =
    useFetchNewClients(newClients, session?.user.token);

  const handleClickUser = (userId) => {
    router.push(`/admin/users/${userId}`);
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
      <AdminMain title="Usuarios">
        <nav>
          <ul className={s.nav}>
            <li
              onClick={() => {
                setShowNewClients(true);
                setShowClients(false);
                setShowAdmins(false);
              }}
            >
              <div
                className={`${s.nav_li} ${
                  showNewClients ? s.nav_li_active : ""
                }`}
              >
                <p>Peticiones Alta de Cliente:</p>
                <p>{newClientUsers.length}</p>
              </div>
            </li>
            <li
              onClick={() => {
                setShowClients(true);
                setShowNewClients(false);
                setShowAdmins(false);
              }}
            >
              <div
                className={`${s.nav_li} ${showClients ? s.nav_li_active : ""}`}
              >
                <p>Lista de Clientes</p>
              </div>
            </li>
            <li
              onClick={() => {
                setShowAdmins(true);
                setShowNewClients(false);
                setShowClients(false);
              }}
            >
              <div
                className={`${s.nav_li} ${showAdmins ? s.nav_li_active : ""}`}
              >
                <p>Administradores</p>
              </div>
            </li>
          </ul>
        </nav>

        {showNewClients && newClientUsers.length > 0 && (
          <section className={s.petitions_grid}>
            <div>
              {newClientUsers.map((user) => (
                <ClientPetitionCard
                  key={user.id}
                  user={user}
                  setNewClientInfo={setNewClientInfo}
                  newClientInfo={newClientInfo}
                />
              ))}
            </div>
            {newClientInfo.fullName && (
              <ClientPetitionInfo
                user={newClientInfo}
                setNewClientInfo={setNewClientInfo}
                refetchNewClients={refetchNewClients}
                refetchClients={refetchClients}
              />
            )}
          </section>
        )}
        {showClients && (
          <section className={s.client_list_wrapper}>
            <input
              type="search"
              placeholder="Buscar por nombre"
              onChange={(e) => setSearch(e.target.value)}
            />

            {clientUsers?.length > 0 && (
              <div className={s.table_wrapper}>
                <table>
                  <thead>
                    <tr>
                      <th>Alta</th>
                      <th>Nombre</th>
                      <th>Tel</th>
                      <th>DNI</th>
                      <th>Provincia</th>
                      <th>Pedidos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientUsers.map((user) => (
                      <tr
                        key={user.id}
                        onClick={() => handleClickUser(user.id)}
                      >
                        <td>
                          {new Date(user.customerApprovedAt).toLocaleDateString(
                            "es-AR",
                            { year: "numeric", day: "numeric", month: "short" }
                          )}
                        </td>
                        <td>{user.fullName}</td>
                        <td>{user.phone}</td>
                        <td>{user.dniNumber}</td>
                        <td>{user.addressProvince}</td>
                        <td>{user.orders?.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!search && (
              <PaginationArrows
                skip={skip}
                setSkip={setSkip}
                totalCount={totalUsers}
              />
            )}
          </section>
        )}

        {showAdmins && (
          <section className={s.client_list_wrapper}>
            <input
              type="search"
              placeholder="Buscar por nombre"
              onChange={(e) => setSearch(e.target.value)}
            />

            {adminUsers.length > 0 &&
              adminUsers.map((user) => (
                <ClientCard user={user} key={user.id} admin />
              ))}
          </section>
        )}
      </AdminMain>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  if (session?.user.role === "ADMIN" || session?.user.role === "EMPLOYEE") {
    // const newClients = await fetch(
    //   process.env.NODE_ENV === "production"
    //     ? `https://www.guanacorental.shop/rentalapi/users?newClients=${true}`
    //     : `http://localhost:3001/users?newClients=${true}`,
    //   { headers: { authorization: `${session?.user.token}` } }
    // )
    //   .then((response) => response.json())
    //   .catch((e) => console.log("fecth error:", e));

    // const clients = await fetch(
    //   process.env.NODE_ENV === "production"
    //     ? `https://www.guanacorental.shop/rentalapi/users?clients=${true}`
    //     : `http://localhost:3001/users?clients=${true}`,
    //   { headers: { authorization: `${session?.user.token}` } }
    // )
    //   .then((response) => response.json())
    //   .catch((e) => console.log("fecth error:", e));

    const admins = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/users?admins=${true}`
        : `http://localhost:3001/users?admins=${true}`,
      { headers: { authorization: `${session?.user.token}` } }
    )
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));

    return {
      props: {
        // newClients,
        // clients,
        admins,
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
