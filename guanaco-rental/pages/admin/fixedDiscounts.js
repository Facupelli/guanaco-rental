import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { getUniqueUser } from "../../utils/fetch_users";
import { authOptions } from "../api/auth/[...nextauth]";
import { useFetchFixedDiscounts } from "../../utils/fixedDiscounts";
import { useState } from "react";

import Nav from "../../components/Nav/Nav";
import AdminMain from "../../components/AdminMain/AdminMain";
import MessageModal from "../../components/MessageModal/MessageModal";
import CreateDiscount from "../../components/AdminCreateDiscount/AdminCreateDiscount";
import AdminDiscountCard from "../../components/AdminDiscountCard/AdminDiscountCard";

import s from "../../styles/AdminFixedDiscountsPage.module.scss";

export default function AdminFixedDiscounts({}) {
  const [showModal, setShowModal] = useState(false);
  const { fixedDiscounts, getFixedDiscounts, loading } =
    useFetchFixedDiscounts();

  return (
    <div className={s.grey_bg}>
      <Head>
        <title>Admin Descuentos Fijos</title>
        <link rel="icon" href="/logo-favicon.ico" />
      </Head>
      <Nav />

      {showModal && (
        <MessageModal btnFunc={() => setShowModal(false)}>
          <CreateDiscount
            getFixedDiscounts={getFixedDiscounts}
            setShowModal={setShowModal}
          />
        </MessageModal>
      )}

      <AdminMain title="Descuentos Fijos">
        <div className={s.add_discount_btn_wrapper}>
          <button
            // disabled={true}
            type="button"
            onClick={() => setShowModal(true)}
          >
            crear descuento
          </button>
        </div>
        <section>
          {loading && <p>Cargando...</p>}
          {!loading &&
            fixedDiscounts.length > 0 &&
            fixedDiscounts.map((discount) => (
              <AdminDiscountCard
                key={discount.id}
                discount={discount}
                getFixedDiscounts={getFixedDiscounts}
              />
            ))}
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

  const res = await getUniqueUser(session?.user.email);

  if (!session || res.user?.role !== "ADMIN") {
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
