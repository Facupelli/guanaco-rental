import { useState } from "react";
import { formatPrice } from "../../utils/price_formater";
import Gear from "./Gear/Gear";
import { usePDF } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";

import s from "./OrderCard.module.scss";
import { RemitoPDF } from "./RemitoPDF";

export default function OrderCard({ order, i }) {
  const [showEquipment, setShowEquipment] = useState(false);
  const [generatePDF, setGeneratePDF] = useState(false);

  const pickupDay = new Date(order.booking.dates[0]).toLocaleDateString();
  const returnDay = new Date(
    order.booking.dates[order.booking.dates.length - 1]
  ).toLocaleDateString();

  const getOrderStatus = () => {
    if (new Date().getTime() < new Date(order.booking.dates[0]).getTime()) {
      return "PENDIENTE";
    }
    if (
      new Date().getTime() >
      new Date(order.booking.dates[order.booking.dates.length - 1]).getTime()
    ) {
      return "FINALIZADO";
    }
    return "EN PROCESO";
  };

  return (
    <div className={s.card_container}>
      <div className={s.info_container}>
        <p>{i + 1}</p>
        <p>{order.user.fullName}</p>
        <p>{order.user.phone}</p>
        <p>{order.user.dniNumber}</p>
        <p>{new Date(order.createdAt).toLocaleDateString()}</p>
        <div>
          <p>retiro: {pickupDay}</p>
          <p>devolución: {returnDay}</p>
        </div>
        <p>{getOrderStatus()}</p>
        <button onClick={() => setShowEquipment(!showEquipment)}>
          Ver Equipos
        </button>
        <p>{formatPrice(order.totalPrice)}</p>
      </div>
      {showEquipment && (
        <div className={s.equipments_container}>
          <p>Equipos:</p>
          {order.equipments.length > 0 &&
            order.equipments.map((gear) => (
              <Gear gear={gear} order={order} key={gear.id} />
            ))}
        </div>
      )}
      <div className={s.remito_wrapper}>
        {!generatePDF && (
          <button type="button" onClick={() => setGeneratePDF(true)}>
            Generar Remito
          </button>
        )}
        {generatePDF && (
          <PDF
            pickupDay={pickupDay}
            returnDay={returnDay}
            order={order}
            i={i}
          />
        )}
      </div>
      {/* {
        generatePDF &&
        <PDFDownloadLink
          document={
            <RemitoPDF
              pickupDay={pickupDay}
              returnDay={returnDay}
              order={order}
              index={i}
            />
          }
          fileName={`Remito ${order.user.fullName} - ${i}`}
        >
          {({ blob, url, loading, error }) => {
            if (error) {
              console.log("PDFlink", error);
            }
            return loading
              ? "Loading document..."
              : `Remito ${order.user.fullName} - ${i}`;
          }}
        </PDFDownloadLink>
      } */}
    </div>
  );
}

const PDF = ({ pickupDay, returnDay, order, i }) => {
  const [instance, updateInstance] = usePDF({
    document: (
      <RemitoPDF
        pickupDay={pickupDay}
        returnDay={returnDay}
        order={order}
        index={i}
      />
    ),
  });

  return instance.loading ? (
    <p>Cargando...</p>
  ) : (
    <a href={instance.url} download={`Remito ${order.user.fullName} - ${i + 1}`}>
      Descargar remito
    </a>
  );
};
