import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { formatPrice, getEachTotalEarnings, getOwnerEarningsByOrder } from "../../utils/price";
import { useCallback, useEffect, useMemo, useState } from "react";

import Nav from "../../components/Nav/Nav";
import AdminMain from "../../components/AdminMain/AdminMain";
import RentsCard from "../../components/RentsCard/RentsCard";

import s from "../../styles/AdminRentsPage.module.scss";

export default function AdminRents({ totalPrice, orders }) {
  const [totalFinished, setTotalFinished] = useState({});
  const [totalPending, setTotalPending] = useState({});
  const [totalCustom, setTotalCustom] = useState({});

  const [selectedDate, setSelectedDate] = useState();

  const today = useMemo(() => new Date(), []);  

  const totalFromOrders = useCallback(
    ({ finished, date }) => {
      const todayTime = today.getTime();
      const filterDateTime = new Date(date).getTime();

      let filteredOrders;
      if (!date) {
        filteredOrders = orders.filter((order) => {
          const lastRentDayTime = new Date(
            order.booking.dates[order.booking.dates.length - 1]
          ).getTime();

          return finished
            ? lastRentDayTime < (date ? filterDateTime : todayTime)
            : lastRentDayTime > todayTime;
        });
      } else {
        filteredOrders = orders.filter((order) => {
          const lastRentDayTime = new Date(
            order.booking.dates[order.booking.dates.length - 1]
          ).getTime();

          return (
            lastRentDayTime < todayTime && lastRentDayTime > filterDateTime
          );
        });
      }

      const total = filteredOrders.reduce((curr, acc) => {
        return curr + acc.totalPrice;
      }, 0);

      const eachEarnings = filteredOrders.map((order) =>
        getOwnerEarningsByOrder(order)
      );

      const federico = eachEarnings.reduce((curr, acc) => {
        return curr + acc.totalFederico;
      }, 0);

      const oscar = eachEarnings.reduce((curr, acc) => {
        return curr + acc.totalOscar;
      }, 0);

      const sub = eachEarnings.reduce((curr, acc) => {
        return curr + acc.totalSub;
      }, 0);

      return {
        total,
        federico,
        oscar,
        sub,
      };
    },
    [orders, today]
  );

  useEffect(() => {
    setTotalFinished(totalFromOrders({ finished: true }));
    setTotalPending(totalFromOrders({ finished: false }));
  }, [totalFromOrders]);

  useEffect(() => {
    if (selectedDate) {
      setTotalCustom(totalFromOrders({ finished: false, date: selectedDate }));
    }
  }, [selectedDate, totalFromOrders]);

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Rents</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      <AdminMain title="Rentas">
        <section className={s.section}>
          <div className={s.flex}>
            <RentsCard>
              <h3>TODAS</h3>
              <p>
                <span className={s.bold}>Total:</span> {formatPrice(totalPrice)}
              </p>
              <p>
                <span className={s.bold}>Federico:</span>{" "}
                {formatPrice(getEachTotalEarnings(orders).federicoEarnings)}
              </p>
              <p>
                <span className={s.bold}>Oscar:</span>{" "}
                {formatPrice(getEachTotalEarnings(orders).oscarEarnings)}
              </p>
              <p>
                <span className={s.bold}>Subalquiler:</span>{" "}
                {formatPrice(getEachTotalEarnings(orders).subEarnings)}
              </p>
            </RentsCard>

            <RentsCard>
              <h3>FINALIZADAS</h3>
              <p>
                Total: {totalFinished.total && formatPrice(totalFinished.total)}
              </p>
              <p>
                Federico:{" "}
                {totalFinished.federico && formatPrice(totalFinished.federico)}
              </p>
              <p>
                Oscar: {totalFinished.oscar && formatPrice(totalFinished.oscar)}
              </p>
              <p>
                Subalquiler:{" "}
                {totalFinished.oscar && formatPrice(totalFinished.sub)}
              </p>
            </RentsCard>

            <RentsCard>
              <h3>PENDIENTES</h3>
              <p>
                TOTAL: {totalPending.total && formatPrice(totalPending.total)}
              </p>
              <p>
                Federico:{" "}
                {totalPending.federico && formatPrice(totalPending.federico)}
              </p>
              <p>
                Oscar: {totalPending.oscar && formatPrice(totalPending.oscar)}
              </p>
              <p>
                Subalquiler:{" "}
                {totalPending.oscar && formatPrice(totalPending.sub)}
              </p>
            </RentsCard>
          </div>

          <RentsCard>
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
          </RentsCard>
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

  const orders = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/order`
      : `http://localhost:3001/order`
  )
    .then((response) => response.json())
    .catch((e) => console.log("fecth error:", e));

  const totalPrice = await fetch(
    process.env.NODE_ENV === "production"
      ? `https://guanaco-rental-production.up.railway.app/rents`
      : `http://localhost:3001/rents`
  )
    .then((res) => res.json())
    .catch((e) => console.log("fecth error:", e));

  return {
    props: {
      session,
      totalPrice: totalPrice._sum.totalPrice,
      orders,
    },
  };
}
