import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { formatPrice, getEachEarnings } from "../../utils/price";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchRents } from "../../utils/rents";

import Nav from "../../components/Nav/Nav";
import AdminMain from "../../components/AdminMain/AdminMain";
import RentsCard from "../../components/RentsCard/RentsCard";
import SelectLoaction from "../../components/SelectLocation/SelectLocation";

import s from "../../styles/AdminRentsPage.module.scss";

export default function AdminRents({ session }) {
  const { orders, totalPrice, loading } = useFetchRents();

  const [ordersFinished, setOrdersFinished] = useState({});
  const [ordersPending, setOrdersPending] = useState({});

  const todayTime = useMemo(() => new Date().getTime(), []);

  const filterOrders = useCallback(
    (orders, finished) => {
      return orders.filter((order) => {
        const lastRentDayTime = new Date(
          order.booking.dates[order.booking.dates.length - 1]
        ).getTime();

        return finished
          ? lastRentDayTime < todayTime
          : lastRentDayTime > todayTime;
      });
    },
    [todayTime]
  );

  useEffect(() => {
    setOrdersFinished(filterOrders(orders, true));
    setOrdersPending(filterOrders(orders, false));
  }, [orders, filterOrders]);

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Rents</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <AdminMain title="Rentas">
        <div className={s.select_location_wrapper}>
          <SelectLoaction adminPanel />
        </div>
        <section className={s.section}>
          <div className={s.flex}>
            <RentsCard>
              <h3>TODAS - 2023</h3>
              <p>
                <span className={s.bold}>Total:</span>
                {loading ? "..." : formatPrice(totalPrice)}
              </p>
              <p>
                <span className={s.bold}>Federico:</span>
                {loading
                  ? "..."
                  : formatPrice(getEachEarnings(orders).federico)}
              </p>
              <p>
                <span className={s.bold}>Oscar:</span>
                {loading ? "..." : formatPrice(getEachEarnings(orders).oscar)}
              </p>
              <p>
                <span className={s.bold}>Subalquiler:</span>
                {loading ? "..." : formatPrice(getEachEarnings(orders).sub)}
              </p>
            </RentsCard>

            {(ordersFinished.length > 0 || ordersPending.length > 0) && (
              <>
                <RentsCard>
                  <h3>FINALIZADAS</h3>
                  <p>
                    Total: {formatPrice(getEachEarnings(ordersFinished).total)}
                  </p>
                  <p>
                    Federico:{" "}
                    {formatPrice(getEachEarnings(ordersFinished).federico)}
                  </p>
                  <p>
                    Oscar: {formatPrice(getEachEarnings(ordersFinished).oscar)}
                  </p>
                  <p>
                    Subalquiler:{" "}
                    {formatPrice(getEachEarnings(ordersFinished).sub)}
                  </p>
                </RentsCard>

                <RentsCard>
                  <h3>PENDIENTES</h3>
                  <p>
                    TOTAL: {formatPrice(getEachEarnings(ordersPending).total)}
                  </p>
                  <p>
                    Federico:{" "}
                    {formatPrice(getEachEarnings(ordersPending).federico)}
                  </p>
                  <p>
                    Oscar: {formatPrice(getEachEarnings(ordersPending).oscar)}
                  </p>
                  <p>
                    Subalquiler:{" "}
                    {formatPrice(getEachEarnings(ordersPending).sub)}
                  </p>
                </RentsCard>
              </>
            )}
          </div>

          {/* <RentsCard>
            <div className={s.title_wrapper}>
              <h3>FINALIZADAS - PERSONALIZADO</h3>
              <div className={s.select_wrapper}>
                <label htmlFor="date">Desde:</label>
                <select
                  id="date"
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value={null}>Seleccionar</option>
                  <option
                    value={
                      new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate() - 7
                      )
                    }
                  >
                    1 semana
                  </option>
                  <option
                    value={
                      new Date(
                        today.getFullYear(),
                        today.getMonth() - 1,
                        today.getDate()
                      )
                    }
                  >
                    1 mes
                  </option>
                  <option
                    value={
                      new Date(
                        today.getFullYear(),
                        today.getMonth() - 6,
                        today.getDate()
                      )
                    }
                  >
                    6 meses
                  </option>
                  <option
                    value={
                      new Date(
                        today.getFullYear() - 1,
                        today.getMonth(),
                        today.getDate()
                      )
                    }
                  >
                    1 año
                  </option>
                  <option value={new Date(today.getFullYear(), 0, 1)}>
                    este año
                  </option>
                </select>
              </div>
            </div>
            <p>
              TOTAL:{" "}
              {totalCustom.total
                ? formatPrice(totalCustom.total)
                : formatPrice(0)}
            </p>
            <p>
              Federico:{" "}
              {totalCustom.federico
                ? formatPrice(totalCustom.federico)
                : formatPrice(0)}
            </p>
            <p>
              Oscar:{" "}
              {totalCustom.oscar
                ? formatPrice(totalCustom.oscar)
                : formatPrice(0)}
            </p>
            <p>
              Subalquiler:{" "}
              {totalCustom.oscar
                ? formatPrice(totalCustom.sub)
                : formatPrice(0)}
            </p>
          </RentsCard> */}
        </section>
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

  if (!session || session?.user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
