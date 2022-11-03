import Head from "next/head";
import { useEffect, useState } from "react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useFetchAllOrders } from "../../../hooks/useFetchAllOrders";
import { useSession } from "next-auth/react";
import { getUniqueUser } from "../../../utils/fetch_users";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../../redux/features/user/userSlice";

import Nav from "../../../components/Nav/Nav";
import AdminMain from "../../../components/AdminMain/AdminMain";
import SelectLoaction from "../../../components/SelectLocation/SelectLocation";
import PaginationArrows from "../../../components/Pagination/PaginationArrows";
import Table from "../../../components/Table/Table";
import OrderRow from "../../../components/OrderRow/OrderRow";

import s from "../../../styles/AdminOrdersPage.module.scss";

const trTitles = [
  "N°",
  "NOMBRE",
  "CELULAR",
  "DNI",
  "RETIRO",
  "DEVOLUCIÓN",
  "ESTADO",
  "TOTAL",
  "REMITO",
  "CITY",
];

export default function AdminOrdersPage({}) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    if (!userData && session) {
      getUniqueUser(session.user.email).then((res) => dispatch(setUserId(res)));
    }
  }, [userData, session, dispatch]);

  //pagination
  const [skip, setSkip] = useState(0);
  const [sortBy, setSortBy] = useState("booking");

  const { orders, totalOrders, loading, refetchOrders } = useFetchAllOrders(
    skip,
    sortBy
  );

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Pedidos</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <AdminMain title="Pedidos">
        <div className={s.select_location_wrapper}>
          <SelectLoaction adminPanel={session?.user.role === "ADMIN"} />
          <div className={s.sortBy_wrapper}>
            <label>Ordenar por:</label>
            <select
              onChange={(e) => {
                setSortBy(e.target.value);
                setSkip(0);
              }}
            >
              <option value="booking">Próximos pedidos a entregar</option>
              <option value="desc">Últimos pedidos creados</option>
            </select>
          </div>
        </div>

        <div className={s.table_wrapper}>
          <Table trTitles={trTitles}>
            {orders.length > 0 &&
              orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  refetchOrders={refetchOrders}
                  token={session?.user.token}
                />
              ))}
          </Table>
        </div>
        <PaginationArrows
          skip={skip}
          setSkip={setSkip}
          totalCount={totalOrders}
        />
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
    return {
      props: { session },
    };
  }

  return {
    redirect: {
      destination: "/",
    },
  };
}
