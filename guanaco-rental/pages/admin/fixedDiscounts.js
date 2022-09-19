import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useFetchFixedDiscounts } from "../../utils/fixedDiscounts";
import { useState } from "react";
import { useSession } from "next-auth/react";

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
  
  const {data:session} = useSession()

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
            token={session?.user.token}
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
                token={session?.user.token}
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
