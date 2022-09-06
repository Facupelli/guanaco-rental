import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faAdd } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { formatPrice } from "../../utils/price_formater";
import {
  generatePdfRows,
  getOrderStatus,
  handleDeleteOrder,
} from "../../utils/orders";

import Gear from "./Gear/Gear";
import MessageModal from "../MessageModal/MessageModal";

import s from "./OrderCard.module.scss";
import { getWorkingTotalDays } from "../../utils/dates_functions";

const PDF = dynamic(() => import("./PDF/PDF"));

export default function OrderCard({ order, getAllOrders }) {
  const [showEquipment, setShowEquipment] = useState(false);
  const [generatePDF, setGeneratePDF] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    if (searchInput.length > 0) {
      const getEquipmentBySearch = async () => {
        const response = await fetch(
          process.env.NODE_ENV === "production"
            ? `https://guanaco-rental-production.up.railway.app/equipment?search=${searchInput}`
            : `http://localhost:3001/equipment?search=${searchInput}`
        );
        const equipment = await response.json();
        setEquipments(equipment);
      };
      getEquipmentBySearch();
    }
  }, [searchInput]);

  const pickupDay = new Date(order.booking.dates[0]).toLocaleDateString();
  const returnDay = new Date(order.booking.dates.at(-1)).toLocaleDateString();

  const equipmentRows = generatePdfRows(order);

  const updateGearFromOrder = async (equipmentId, equipmentPrice, operation) => {
    const newTotalPrice = () => {
      const workingDays = getWorkingTotalDays(order.booking.dates, order.booking.pickupHour)

      return workingDays * equipmentPrice;
    }

    const newPrice = newTotalPrice()

    const data = JSON.stringify({
      bookingId: order.bookingId,
      orderId: order.id,
      equipmentId,
      operation,
      newPrice,
    });

    const updatedOrder = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://guanaco-rental-production.up.railway.app/order`
        : "http://localhost:3001/order",
      {
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

  return (
    <>
      {showDeleteModal && (
        <MessageModal btnFunc={() => setShowDeleteModal(false)}>
          <button
            type="button"
            className={s.cancel_order}
            onClick={() => handleDeleteOrder(order.bookingId, getAllOrders)}
          >
            CANCELAR ORDEN
          </button>
        </MessageModal>
      )}
      {showAddEquipmentModal && (
        <MessageModal
          showButton
          btnFunc={() => setShowAddEquipmentModal(false)}
        >
          <input
            type="search"
            className={s.search}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div>
            {equipments.length > 0 &&
              equipments.map((gear) => (
                <div key={gear.id} className={s.modal_gear_wrapper}>
                  <p>
                    {gear.name}
                    {gear.brand}
                    {gear.model}
                  </p>
                  <div className={s.add_gear_btn_wrapper}>
                    <button
                      type="button"
                      aria-label="add_gear"
                      onClick={() =>
                        updateGearFromOrder(gear.id, gear.price, "add").then(() =>
                          getAllOrders()
                        )
                      }
                    >
                      <FontAwesomeIcon
                        icon={faAdd}
                        className={s.add_gear_icon}
                      />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </MessageModal>
      )}
      <div className={s.card_container}>
        <div className={s.info_container}>
          <p>{order.number}</p>
          <p>{order.user.fullName}</p>
          <p>{order.user.phone}</p>
          <p>{order.user.dniNumber}</p>
          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          <div>
            <div className={s.flex}>
              <p>retiro: {pickupDay}</p>
              <p className={s.pickup_hour}>- {order.booking.pickupHour}hs</p>
            </div>
            <p>devolución: {returnDay}</p>
          </div>
          <p className={`${getOrderStatus(order, s).class}`}>
            {getOrderStatus(order, s).status}
          </p>
          <button
            className={s.show_equipment_btn}
            onClick={() => setShowEquipment(!showEquipment)}
          >
            Ver Equipos
          </button>
          <p>{formatPrice(order.totalPrice)}</p>
          <button
            className={s.elipsis_menu_btn}
            aria-label="menu-btn"
            onClick={() => setShowDeleteModal(true)}
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
                    updateGearFromOrder={updateGearFromOrder}
                    getAllOrders={getAllOrders}
                  />
                ))}
            </div>
            <div className={s.add_gear_btn_wrapper}>
              <button
                type="button"
                aria-label="add_gear"
                onClick={() => setShowAddEquipmentModal(true)}
              >
                <FontAwesomeIcon icon={faAdd} className={s.add_gear_icon} />
              </button>
            </div>
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
        </div>
      </div>
    </>
  );
}
