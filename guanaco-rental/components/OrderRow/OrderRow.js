import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  generatePdfRows,
  getOrderStatus,
  handleDeliveredChange,
} from "../../utils/orders";
import { formatPrice } from "../../utils/price";

import s from "./OrderRow.module.scss";

const PDF = dynamic(() => import("../OrderCard/PDF/PDF"));

export default function OrderRow({
  calendarTab,
  userTab,
  order,
  refetchOrders,
  token,
}) {
  const router = useRouter();

  const [showEquipment, setShowEquipment] = useState(false);
  const [generatePDF, setGeneratePDF] = useState(false);

  const handleClickUser = (orderId) => {
    router.push(`/admin/orders/${orderId}`);
  };

  const pickupDay = new Date(order.booking.dates[0]).toLocaleDateString(
    "es-AR"
  );
  const returnDay = new Date(order.booking.dates.at(-1)).toLocaleDateString(
    "es-AR"
  );

  const equipmentRows = generatePdfRows(order);

  return (
    <>
      <tr className={`${s.row} ${showEquipment ? s.show_active : ""}`}>
        <td>
          <Link href={`/admin/orders/${order.id}`}>
            <a>
              <strong>{order.number}</strong>
            </a>
          </Link>
        </td>
        {!userTab && (
          <>
            <td>
              <Link href={`/admin/orders/${order.id}`}>
                <a>{order.user.fullName}</a>
              </Link>
            </td>
            {!calendarTab && (
              <>
                <td>
                  <Link href={`/admin/orders/${order.id}`}>
                    <a>{order.user.phone}</a>
                  </Link>
                </td>
                <td>
                  <Link href={`/admin/orders/${order.id}`}>
                    <a>{order.user.dniNumber}</a>
                  </Link>
                </td>
              </>
            )}
          </>
        )}
        <td>
          <Link href={`/admin/orders/${order.id}`}>
            <a>
              {pickupDay} - {order.booking.pickupHour}hs
            </a>
          </Link>
        </td>
        <td>
          <Link href={`/admin/orders/${order.id}`}>
            <a>{returnDay}</a>
          </Link>
        </td>
        <td>
          {getOrderStatus(order).status === "EN PROCESO" ? (
            <div className={s.flex}>
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
            <div className={s.flex}>
              <div className={`${getOrderStatus(order)?.class}`}></div>
              {getOrderStatus(order)?.status}
            </div>
          )}
        </td>
        {/* <td>
          <button
            className={s.show_equipment_btn}
            onClick={() => setShowEquipment(!showEquipment)}
          >
            ver
          </button>
        </td> */}
        <td
          className={s.total_price}
          onClick={() => handleClickUser(order.id)}
          // onClick={() => setShowDiscountModal(true)}
        >
          {formatPrice(order.totalPrice)}
        </td>
        {!calendarTab && (
          <td>
            {!generatePDF && (
              <button
                type="button"
                onClick={() => {
                  setGeneratePDF(true);
                }}
                className={s.generate_pdf_btn}
              >
                Generar
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
          </td>
        )}
        <td onClick={() => handleClickUser(order.id)}>
          {order.location === "MENDOZA" ? "MDZ" : "SJ"}
        </td>
      </tr>
      {/* {showEquipment && (
        <table>
          <tbody>
            <tr className={`${showEquipment ? s.equipment_row : ""}`}>
              <td>
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
                      <FontAwesomeIcon
                        icon={faAdd}
                        className={s.add_gear_icon}
                      />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )} */}
    </>
  );
}

// {
//   !indexAdmin &&
//     (getOrderStatus(order).status === "EN PROCESO" ? (
//       <div className={s.delivered_btn_wrapper}>
//         <label>ENTREGADO</label>
//         <input
//           type="checkbox"
//           defaultChecked={order.delivered}
//           onClick={() =>
//             handleDeliveredChange(order.id, true, refetchOrders, token)
//           }
//         />
//       </div>
//     ) : (
//       <p className={`${getOrderStatus(order)?.class}`}>
//         {getOrderStatus(order)?.status}
//       </p>
//     ));
// }
