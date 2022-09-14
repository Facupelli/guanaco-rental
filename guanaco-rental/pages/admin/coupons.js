import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { getUniqueUser } from "../../utils/fetch_users";
import { authOptions } from "../api/auth/[...nextauth]";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Nav from "../../components/Nav/Nav";
import AdminMain from "../../components/AdminMain/AdminMain";
import MessageModal from "../../components/MessageModal/MessageModal";
import AdminCouponCard from "../../components/AdminCouponCard/AdminCouponCard";

import s from "../../styles/AdminCouponsPage.module.scss";

export default function AdminRents({}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showCouponModal, setShowCouponModal] = useState(false);

  const [coupons, setCoupons] = useState({});

  const getCoupons = async () => {
    const response = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/coupons`
        : "http://localhost:3001/coupons"
    );
    const coupons = await response.json();
    setCoupons(coupons);
  };

  useEffect(() => {
    getCoupons();
  }, []);

  const handleDeleteCoupon = async (couponId) => {
    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://guanaco-rental-production.up.railway.app/coupons/${couponId}`
          : `http://localhost:3001/coupons/${couponId}`,
        {
          method: "DELETE",
        }
      );
      const deletedCoupon = await response.json();
      if (deletedCoupon.message === "success") {
        getCoupons();
      }
    } catch (e) {
      console.log("delete coupon error:", e);
    }
  };

  const onSubmit = async (data) => {
    const couponData = JSON.stringify(data);

    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `https://guanaco-rental-production.up.railway.app/coupons`
          : "http://localhost:3001/coupons",
        {
          method: "POST",
          body: couponData,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const newCoupon = await response.json();

      if (newCoupon.message === "success") {
        getCoupons();
        setShowCouponModal(false);
      }
    } catch (e) {
      console.log("create coupon error:", e);
    }
  };

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Cupones</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />
      {showCouponModal && (
        <MessageModal
          // showButton
          // btnName="CREAR"
          btnFunc={() => {
            setShowCouponModal(false);
          }}
        >
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <h2>CREAR CUPÓN</h2>
            <label htmlFor="name">Nombre*:</label>
            <input type="text" id="name" {...register("name")} />
            <label htmlFor="discount">Descuento*: (%)</label>
            <input type="text" id="discount" {...register("discount")} />
            <label htmlFor="expirationDate">Fecha de expiración:</label>
            <input
              type="date"
              id="expirationDate"
              {...register("expirationDate")}
            />
            <label htmlFor="maxOrders">Máximo número de pedidos:</label>
            <input type="text" id="maxOrders" {...register("maxOrders")} />
            <button type="submit">CREAR</button>
          </form>
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
              {coupons.finishedCoupons?.length > 0 &&
                coupons.finishedCoupons.map((coupon) => (
                  <AdminCouponCard
                    key={coupon.id}
                    coupon={coupon}
                    handleDeleteCoupon={handleDeleteCoupon}
                    danger
                  />
                ))}
            </div>
          </section>
          <section>
            <h3>CUPONES ACTIVOS</h3>
            <div>
              {coupons.activeCoupons?.length > 0 &&
                coupons.activeCoupons.map((coupon) => (
                  <AdminCouponCard
                    key={coupon.id}
                    coupon={coupon}
                    handleDeleteCoupon={handleDeleteCoupon}
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

  const user = await getUniqueUser(session?.user.email);

  if (!session || user?.role !== "ADMIN") {
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
