import Head from "next/head";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import { formatPrice } from "../../../utils/price";
import { handleDeleteOrder } from "../../../utils/orders";

import { useDebounce } from "../../../hooks/useDebounce";

import Nav from "../../../components/Nav/Nav";
import AdminMain from "../../../components/AdminMain/AdminMain";
import Gear from "../../../components/OrderCard/Gear/Gear";
import MessageModal from "../../../components/MessageModal/MessageModal";
import AddGearForm from "../../../components/OrderCard/AddGearForm/AddGearForm";

import s from "../../../styles/AdminOrderDetail.module.scss";

export default function UserProfile({ orderData }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [order, setOrder] = useState(orderData);

  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountValue, setDiscountValue] = useState("");

  const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);
  const [addGearInputs, setAddGearInputs] = useState({
    search: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState([]);

  const debouncedGearInput = useDebounce(addGearInputs.search, 500);

  const getEquipment = useCallback(async () => {
    if (debouncedGearInput) {
      setLoading(true);
      const getEquipmentBySearch = async () => {
        try {
          const response = await fetch(
            process.env.NODE_ENV === "production"
              ? `https://www.guanacorental.shop/rentalapi/equipment?location=${order.location}&search=${debouncedGearInput}`
              : `http://localhost:3001/equipment?location=${order.location}&search=${debouncedGearInput}`
          );
          const equipment = await response.json();
          setEquipments(equipment);
        } catch (e) {
          console.log("getEquipmentBySearch error:", e);
        }
        setLoading(false);
      };
      getEquipmentBySearch();
    }
  }, [order.location, debouncedGearInput]);

  // getEquipment();
  useEffect(() => {
    getEquipment();
  }, [debouncedGearInput, order.location, getEquipment]);

  const refetchOrders = async () => {
    const orderData = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/order/${order.id}`
        : `http://localhost:3001/order/${order.id}`,
      { headers: { authorization: `${session?.user.token}` } }
    )
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));

    setOrder(orderData);
    return;
  };

  const pickupDay = new Date(order.booking.dates[0]).toLocaleDateString(
    "es-AR",
    {
      year: "numeric",
      day: "numeric",
      month: "short",
    }
  );
  const returnDay = new Date(order.booking.dates.at(-1)).toLocaleDateString(
    "es-AR",
    {
      year: "numeric",
      day: "numeric",
      month: "short",
    }
  );

  const handleApplyDiscount = async () => {
    const response = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/order`
        : "http://localhost:3001/order",
      {
        method: "PUT",
        body: JSON.stringify({
          orderId: order.id,
          newOrderDiscount: discountValue,
        }),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          authorization: `${session?.user.token}`,
        },
      }
    );
    const updatedOrder = await response.json();

    if (updatedOrder.message === "success") {
      setShowDiscountModal(false);
      refetchOrders();
    }
  };

  return (
    <div className={s.bg_grey}>
      <Head>
        <title>
          Detalle n° {order.number} | {order.user.fullName}
        </title>
        <link rel="icon" href="/logo-favicon.ico" />
        <link
          rel="preconnect"
          href="https://www.guanacorental.shop/rentalapi"
        />
      </Head>
      <Nav />
      {showDiscountModal && session?.user.role === "ADMIN" && (
        <MessageModal btnFunc={() => setShowDiscountModal(false)}>
          <div className={s.discount_modal_wrapper}>
            <p>
              Pedido N° <strong>{order.number}</strong>
            </p>
            <p>
              Total <strong>{formatPrice(order.totalPrice)}</strong>
            </p>
            <div className={s.input_wrapper}>
              <label htmlFor="admin-discount">Aplicar descuento (%):</label>
              <input
                type="text"
                id="admin-discount"
                onChange={(e) => setDiscountValue(e.target.value)}
              />
            </div>
            <div className={s.apply_discount_btn_wrapper}>
              <button
                type="button"
                onClick={handleApplyDiscount}
                disabled={!discountValue}
              >
                APLICAR
              </button>
            </div>
          </div>
        </MessageModal>
      )}
      {showAddEquipmentModal && (
        <MessageModal
          showButton
          btnFunc={() => setShowAddEquipmentModal(false)}
          btnName={loading ? "CARGANDO" : "CERRAR"}
        >
          <AddGearForm
            equipments={equipments}
            setAddGearInputs={setAddGearInputs}
            addGearInputs={addGearInputs}
            order={order}
            loading={loading}
            refetchOrders={refetchOrders}
            token={session?.user.token}
          />
        </MessageModal>
      )}
      <AdminMain title="Pedidos" subtitle="Detalles Pedido" link="orders">
        {/* <ArrowBackBtn /> */}
        {order && (
          <>
            <div className={s.card}>
              <div className={s.card_title}>
                <h3>#{order.number}</h3>
                <p>
                  {new Date(order.createdAt).toLocaleDateString("es-AR", {
                    year: "numeric",
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
              <div className={s.flex}>
                <div className={s.item}>
                  <p>nombre</p>
                  <p
                    onClick={() => router.push(`/admin/users/${order.user.id}`)}
                    className={s.fullName}
                  >
                    {order.user.fullName}
                  </p>
                </div>
                <div className={s.item}>
                  <p>email</p>
                  <p>{order.user.email}</p>
                </div>
                <div className={s.item}>
                  <p>cel</p>
                  <p>{order.user.phone}</p>
                </div>
                <div className={s.item}>
                  <p>DNI</p>
                  <p>{order.user.dniNumber}</p>
                </div>
              </div>
            </div>

            <div className={s.card}>
              <h3>Equipos</h3>
              <div>
                <div className={s.equipments_container}>
                  {order.equipments.length > 0 &&
                    order.equipments.map((gear) => (
                      <Gear
                        editable
                        gear={gear}
                        order={order}
                        key={gear.id}
                        refetchOrders={refetchOrders}
                        token={session?.user.token}
                        role={session?.user.role}
                      />
                    ))}
                </div>
                {session?.user.role === "ADMIN" && (
                  <div className={s.add_gear_btn_wrapper}>
                    <button
                      type="button"
                      aria-label="add_gear"
                      onClick={() => setShowAddEquipmentModal(true)}
                    >
                      <FontAwesomeIcon
                        icon={faAdd}
                        className={s.add_gear_icon}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={s.card}>
              <h3 className={s.margin_b}>Resumen</h3>
              <div className={s.fifty_fifty_grid}>
                <div>
                  <div className={`${s.flex} ${s.margin_b}`}>
                    <div className={s.item}>
                      <p>Retiro</p>
                      <p>
                        {pickupDay} - {order.booking.pickupHour}hs
                      </p>
                    </div>
                    <div className={s.item}>
                      <p>Devolución</p>
                      <p>{returnDay}</p>
                    </div>
                  </div>
                  <div className={`${s.flex_col} ${s.margin_b_2}`}>
                    <div className={s.flex}>
                      <p>Cupón:</p>
                      <p className={s.bold}>
                        {order.coupon
                          ? `${order.coupon?.name} / ${order.coupon?.discount} %`
                          : "--"}
                      </p>
                    </div>
                    <div className={s.flex}>
                      <p>Descuento admin:</p>
                      <p className={s.bold}>
                        {order.adminDiscountValue || "--"} %
                      </p>
                    </div>
                    <div className={s.flex}>
                      <p>Descuento fijo:</p>
                      <p className={s.bold}>
                        {order.fixedDiscount
                          ? `${order.fixedDiscount?.name} ${order.fixedDiscount?.discount} %`
                          : "--"}
                      </p>
                    </div>
                    <div className={s.flex}>
                      <p>Total original:</p>
                      <p>{formatPrice(order.originalTotalPrice)}</p>
                    </div>
                    <div className={s.flex}>
                      <p>Total:</p>
                      <p>
                        <strong>{formatPrice(order.totalPrice)}</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  {session?.user.role === "ADMIN" && (
                    <div className={`${s.flex_col}`}>
                      <div className={s.flex}>
                        <p>Federico:</p>
                        <p>{formatPrice(order.orderEarnings?.federico)}</p>
                      </div>
                      <div className={s.flex}>
                        <p>Oscar:</p>
                        <p>{formatPrice(order.orderEarnings?.oscar)}</p>
                      </div>
                      <div className={s.flex}>
                        <p>Subalquiler:</p>
                        <p>{formatPrice(order.orderEarnings?.sub)}</p>
                      </div>
                    </div>
                  )}
                  {session?.user.role === "ADMIN" && (
                    <div className={s.apply_discount_btn_wrapper}>
                      <button onClick={() => setShowDiscountModal(true)}>
                        aplicar descuento
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(session?.user.role === "ADMIN" ||
              session?.user.role === "EMPLOYEE") && (
              <div className={`${s.card} ${s.danger_div}`}>
                <h3 className={s.margin_b}>Cancelar Pedido</h3>
                <p>
                  El pedido sera cancelado. Se notificará al usuario via mail.
                </p>
                <button
                  onClick={() => {
                    router.push("/admin/orders");
                    handleDeleteOrder(
                      order.bookingId,
                      order.id,
                      refetchOrders,
                      session?.user.token
                    );
                  }}
                >
                  CANCELAR
                </button>
              </div>
            )}
          </>
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

  const id = ctx.params.id;

  if (session?.user.role === "ADMIN" || session?.user.role === "EMPLOYEE") {
    const orderData = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://www.guanacorental.shop/rentalapi/order/${id}`
        : `http://localhost:3001/order/${id}`,
      { headers: { authorization: `${session?.user.token}` } }
    )
      .then((response) => response.json())
      .catch((e) => console.log("fecth error:", e));

    return {
      props: {
        orderData,
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
