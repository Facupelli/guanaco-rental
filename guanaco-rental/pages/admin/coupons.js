import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useState } from "react";
import { useFetchCoupons } from "../../utils/coupons";

import Nav from "../../components/Nav/Nav";
import AdminMain from "../../components/AdminMain/AdminMain";
import MessageModal from "../../components/MessageModal/MessageModal";
import AdminCouponCard from "../../components/AdminCouponCard/AdminCouponCard";
import CreateCoupon from "../../components/AdminCreateCoupon/CreateCoupon";

import s from "../../styles/AdminCouponsPage.module.scss";

export default function AdminCoupons({}) {
  const [showCouponModal, setShowCouponModal] = useState(false);

  const { coupons, getCoupons, loading } = useFetchCoupons();

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Cupones</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      {showCouponModal && (
        <MessageModal
          btnFunc={() => {
            setShowCouponModal(false);
          }}
        >
          <CreateCoupon
            getCoupons={getCoupons}
            setShowCouponModal={setShowCouponModal}
          />
        </MessageModal>
      )}
      <AdminMain title="Cupones">
        <div className={s.add_coupon_btn_wrapper}>
          <button type="button" onClick={() => setShowCouponModal(true)}>
            Agregar cupón
          </button>
        </div>
        <div className={s.flex_50_50}>
          <section>
            <h3>CUPONES FINALIZADOS</h3>
            <div className={s.finished_coupons_wrapper}>
              {loading && <p>Cargando...</p>}
              {!loading &&
                coupons.finishedCoupons?.length > 0 &&
                coupons.finishedCoupons.map((coupon) => (
                  <AdminCouponCard
                    key={coupon.id}
                    coupon={coupon}
                    danger
                    getCoupons={getCoupons}
                  />
                ))}
            </div>
          </section>
          <section>
            <h3>CUPONES ACTIVOS</h3>
            <div>
              {loading && <p>Cargando...</p>}
              {!loading &&
                coupons.activeCoupons?.length > 0 &&
                coupons.activeCoupons.map((coupon) => (
                  <AdminCouponCard
                    key={coupon.id}
                    coupon={coupon}
                    getCoupons={getCoupons}
                  />
                ))}
            </div>
          </section>
        </div>
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
