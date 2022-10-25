import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faAdd } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { formatPrice, getEachEarnings } from "../../utils/price";
import {
  generatePdfRows,
  getOrderStatus,
  handleDeleteOrder,
  handleDeliveredChange,
  updateGearFromOrder,
} from "../../utils/orders";
import { useDebounce } from "../../hooks/useDebounce";

import Gear from "./Gear/Gear";
import MessageModal from "../MessageModal/MessageModal";

import s from "./OrderCard.module.scss";

const PDF = dynamic(() => import("./PDF/PDF"));

export default function OrderCard({ order, userRole, refetchOrders, token }) {
  const [showEquipment, setShowEquipment] = useState(false);
  const [generatePDF, setGeneratePDF] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  const [discountValue, setDiscountValue] = useState();

  const [addGearInputs, setAddGearInputs] = useState({
    search: "",
    quantity: "",
  });

  const debouncedGearInput = useDebounce(addGearInputs.search, 500);

  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [earnings, setEarnings] = useState({});

  useEffect(() => {
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
  }, [debouncedGearInput, order.location]);

  const pickupDay = new Date(order.booking.dates[0]).toLocaleDateString(
    "es-AR"
  );
  const returnDay = new Date(order.booking.dates.at(-1)).toLocaleDateString(
    "es-AR"
  );

  const equipmentRows = generatePdfRows(order);

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
          authorization: `${token}`,
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
    <>
      {showDiscountModal && (
        <MessageModal btnFunc={() => setShowDiscountModal(false)}>
          {userRole === "ADMIN" && (
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
          )}
        </MessageModal>
      )}
      {showDeleteModal && (
        <MessageModal btnFunc={() => setShowDeleteModal(false)}>
          <div className={s.menu_modal_wrapper}>
            {userRole === "ADMIN" && (
              <>
                <div>
                  <p>Federico:</p>
                  <p className={s.bold}>{formatPrice(earnings?.federico)}</p>
                </div>
                <div>
                  <p>Oscar:</p>
                  <p className={s.bold}>{formatPrice(earnings?.oscar)}</p>
                </div>
                <div>
                  <p>Subalquiler:</p>
                  <p className={s.bold}>{formatPrice(earnings?.sub)}</p>
                </div>
                <div className={s.border_top}>
                  <p>Total original:</p>
                  <p className={s.bold}>
                    {formatPrice(order.originalTotalPrice)}
                  </p>
                </div>
                <div>
                  <p>Total:</p>
                  <p className={s.bold}>{formatPrice(order.totalPrice)}</p>
                </div>
                <div>
                  <p>Descuento admin:</p>
                  <p className={s.bold}>{order.adminDiscountValue || "--"} %</p>
                </div>
                <div>
                  <p>Descuento fijo:</p>
                  <p className={s.bold}>
                    {order.fixedDiscount
                      ? `${order.fixedDiscount?.name} ${order.fixedDiscount?.discount} %`
                      : "-- %"}
                  </p>
                </div>
              </>
            )}
            <div className={s.cancel_btn_wrapper}>
              <button
                type="button"
                className={s.cancel_order}
                onClick={() =>
                  handleDeleteOrder(
                    order.bookingId,
                    order.id,
                    refetchOrders,
                    token
                  )
                }
              >
                CANCELAR ORDEN
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
          <AddGearModalChildren
            equipments={equipments}
            setAddGearInputs={setAddGearInputs}
            addGearInputs={addGearInputs}
            order={order}
            loading={loading}
            refetchOrders={refetchOrders}
            token={token}
          />
        </MessageModal>
      )}
      <div className={s.card_container}>
        <div className={s.info_container}>
          <p className={s.mobile_bold}>{order.number}</p>
          <p>{order.user.fullName}</p>
          <p>{order.user.phone}</p>
          <p className={s.mobile_none}>{order.user.dniNumber}</p>
          <p>{new Date(order.createdAt).toLocaleDateString("es-AR")}</p>
          <div className={s.flex_b_100}>
            <div className={s.flex}>
              <p>
                retiro: <strong>{pickupDay}</strong>
              </p>
              <p className={s.pickup_hour}>- {order.booking.pickupHour}hs</p>
            </div>
            <p>
              devolución: <strong>{returnDay}</strong>
            </p>
          </div>
          {getOrderStatus(order).status === "EN PROCESO" ? (
            <div className={s.delivered_btn_wrapper}>
              <label>ENTREGADO</label>
              <input
                type="checkbox"
                defaultChecked={order.delivered}
                onClick={() =>
                  handleDeliveredChange(order.id, true, refetchOrders, token)
                }
              />
            </div>
          ) : (
            <p className={`${getOrderStatus(order)?.class}`}>
              {getOrderStatus(order)?.status}
            </p>
          )}
          <button
            className={s.show_equipment_btn}
            onClick={() => setShowEquipment(!showEquipment)}
          >
            Ver Equipos
          </button>
          <p
            className={s.total_price}
            onClick={() => setShowDiscountModal(true)}
          >
            {formatPrice(order.totalPrice)}
          </p>
          <button
            className={`${s.elipsis_menu_btn}`}
            aria-label="menu-btn"
            onClick={() => {
              setEarnings(getEachEarnings([order]));
              setShowDeleteModal(true);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        {showEquipment && (
          <>
            <div className={s.equipments_container}>
              <p>Equipos:</p>
              {order.equipments.length > 0 &&
                order.equipments.map((gear) => (
                  <Gear
                    editable
                    gear={gear}
                    order={order}
                    key={gear.id}
                    refetchOrders={refetchOrders}
                    token={token}
                  />
                ))}
            </div>
            {!order.delivered && (
              <div className={s.add_gear_btn_wrapper}>
                <button
                  type="button"
                  aria-label="add_gear"
                  onClick={() => setShowAddEquipmentModal(true)}
                >
                  <FontAwesomeIcon icon={faAdd} className={s.add_gear_icon} />
                </button>
              </div>
            )}
          </>
        )}
        <div className={s.remito_wrapper}>
          {!generatePDF && (
            <button
              type="button"
              onClick={() => {
                setGeneratePDF(true);
              }}
            >
              Generar Remito
            </button>
          )}
          {generatePDF && (
            <PDF
              pickupDay={pickupDay}
              returnDay={returnDay}
              order={order}
              equipmentRows={equipmentRows}
            />
          )}
          <p className={s.location}>
            {order.location === "MENDOZA" ? "MDZ" : "SJ"}
          </p>
          {order.coupon && (
            <p className={s.coupon_name}>cupón: {order.coupon.name}</p>
          )}
        </div>
        <div className={s.message_wrapper}>{order.message}</div>
      </div>
    </>
  );
}

const AddGearModalChildren = ({
  equipments,
  setAddGearInputs,
  addGearInputs,
  order,
  loading,
  refetchOrders,
  token,
}) => {
  return (
    <>
      <div className={s.add_gear_title}>
        <h3>Agregar equipo a pedido</h3>
        <p>(controlar stock manualmente!)</p>
      </div>
      <input
        type="search"
        className={s.search}
        onChange={(e) =>
          setAddGearInputs((prev) => ({ ...prev, search: e.target.value }))
        }
      />
      <div>
        {loading && <p>Cargando...</p>}
        {!loading &&
          equipments.length > 0 &&
          equipments.map((gear) => (
            <div key={gear.id} className={s.modal_gear_wrapper}>
              <p className={s.gear_name}>
                {gear.name} {gear.brand} {gear.model}
              </p>
              <input
                type="text"
                className={s.qty_input}
                onChange={(e) =>
                  setAddGearInputs((prev) => ({
                    ...prev,
                    quantity: e.target.value,
                  }))
                }
              />
              <div className={s.add_gear_btn_wrapper}>
                <button
                  type="button"
                  aria-label="add_gear"
                  onClick={() => {
                    if (
                      addGearInputs.quantity &&
                      addGearInputs.quantity <= gear.stock
                    ) {
                      updateGearFromOrder(
                        order,
                        gear,
                        "add",
                        addGearInputs,
                        token
                      ).then(() => refetchOrders());
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faAdd} className={s.add_gear_icon} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
