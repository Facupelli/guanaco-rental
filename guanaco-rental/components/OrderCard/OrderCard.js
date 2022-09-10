import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faAdd } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { formatPrice, getOwnerEarnings } from "../../utils/price";
import {
  generatePdfRows,
  getOrderStatus,
  handleDeleteOrder,
  handleDeliveredChange,
  updateGearFromOrder,
} from "../../utils/orders";

import Gear from "./Gear/Gear";
import MessageModal from "../MessageModal/MessageModal";

import s from "./OrderCard.module.scss";

const PDF = dynamic(() => import("./PDF/PDF"));

export default function OrderCard({ order, getAllOrders, userRole }) {
  const [showEquipment, setShowEquipment] = useState(false);
  const [generatePDF, setGeneratePDF] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);

  const [addGearInputs, setAddGearInputs] = useState({
    search: "",
    quantity: "",
  });

  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    if (addGearInputs.search.length > 0) {
      const getEquipmentBySearch = async () => {
        try {
          const response = await fetch(
            process.env.NODE_ENV === "production"
              ? `https://guanaco-rental-production.up.railway.app/equipment?search=${addGearInputs.search}`
              : `http://localhost:3001/equipment?search=${addGearInputs.search}`
          );
          const equipment = await response.json();
          setEquipments(equipment);
        } catch (e) {
          console.log("getEquipmentBySearch error:", e);
        }
      };
      getEquipmentBySearch();
    }
  }, [addGearInputs.search]);

  const pickupDay = new Date(order.booking.dates[0]).toLocaleDateString();
  const returnDay = new Date(order.booking.dates.at(-1)).toLocaleDateString();

  const equipmentRows = generatePdfRows(order);

  const [earnings, setEarnings] = useState({});

  return (
    <>
      {showDeleteModal && (
        <MessageModal btnFunc={() => setShowDeleteModal(false)}>
          <div className={s.menu_modal_wrapper}>
            {userRole === "ADMIN" && (
              <>
                <div>
                  <p>Federico:</p>
                  <p className={s.bold}>
                    {formatPrice(earnings?.totalFederico)}
                  </p>
                </div>
                <div>
                  <p>Oscar:</p>
                  <p className={s.bold}>{formatPrice(earnings?.totalOscar)}</p>
                </div>
              </>
            )}
            <div className={s.cancel_btn_wrapper}>
              <button
                type="button"
                className={s.cancel_order}
                onClick={() => handleDeleteOrder(order.bookingId, getAllOrders)}
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
          btnName="CERRAR"
        >
          <AddGearModalChildren
            equipments={equipments}
            setAddGearInputs={setAddGearInputs}
            addGearInputs={addGearInputs}
            getAllOrders={getAllOrders}
            order={order}
          />
        </MessageModal>
      )}
      <div className={s.card_container}>
        <div className={s.info_container}>
          <p className={s.mobile_bold}>{order.number}</p>
          <p>{order.user.fullName}</p>
          <p>{order.user.phone}</p>
          <p className={s.mobile_none}>{order.user.dniNumber}</p>
          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          <div className={s.flex_b_100}>
            <div className={s.flex}>
              <p>retiro: {pickupDay}</p>
              <p className={s.pickup_hour}>- {order.booking.pickupHour}hs</p>
            </div>
            <p>devolución: {returnDay}</p>
          </div>
          {getOrderStatus(order).status === "EN PROCESO" ? (
            <div className={s.delivered_btn_wrapper}>
              <label>ENTREGADO</label>
              <input
                type="checkbox"
                defaultChecked={order.delivered}
                onClick={() =>
                  handleDeliveredChange(order.id, true, getAllOrders)
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
          <p>{formatPrice(order.totalPrice)}</p>
          <button
            className={`${s.elipsis_menu_btn}`}
            aria-label="menu-btn"
            onClick={() => {
              setEarnings(getOwnerEarnings(order));
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
                    getAllOrders={getAllOrders}
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
        </div>
      </div>
    </>
  );
}

const AddGearModalChildren = ({
  equipments,
  setAddGearInputs,
  addGearInputs,
  getAllOrders,
  order,
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
        {equipments.length > 0 &&
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
                        addGearInputs
                      ).then(() => getAllOrders());
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
