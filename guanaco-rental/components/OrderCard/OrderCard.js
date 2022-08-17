import { useState } from "react";
import { formatPrice } from "../../utils/price_formater";
import Gear from "./Gear/Gear";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

import s from "./OrderCard.module.scss";

export default function OrderCard({ order, i }) {
  const [showEquipment, setShowEquipment] = useState(false);

  const pickupDay = new Date(order.booking.dates[0]).toLocaleDateString();
  const returnDay = new Date(
    order.booking.dates[order.booking.dates.length - 1]
  ).toLocaleDateString();

  console.log(order.booking.id);

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
        <p>
          {new Date().getTime() < new Date(order.booking.dates[0]).getTime()
            ? "PENDIENTE"
            : "ALQUILANDO"}
        </p>
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
      <PDFDownloadLink
        document={
          <RemitoPDF
            pickupDay={pickupDay}
            returnDay={returnDay}
            order={order}
            index={i}
          />
        }
        fileName={`Remito ${order.user.fullName}`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : `Remito ${order.user.fullName}`
        }
      </PDFDownloadLink>
    </div>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontSize: 12,
  },
  pageMargin: {
    marginLeft: 25,
    marginRight: 25,
    border: "2px solid black",
    borderRadius: 10,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  equipment: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 10,
    paddingLeft: 5,
  },
  userSection: {
    borderBottom: "2px solid black",
    padding: 20,
  },
  section: {
    padding: 20,
    height: "100%",
  },
  paddingB: {
    marginBottom: 10,
  },
  bottomSigns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 8,
    padding: 15,
  },
  signs: {
    borderTop: "1px solid black",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  number: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    marginRight: 25,
    fontSize: 10,
    paddingBottom: 10,
  },
  bottomPage: {
    fontSize: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 6,
  },
});

const RemitoPDF = ({ pickupDay, returnDay, order, index }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.number}>
        <Text>REMITO N° {index + 1}</Text>
      </View>
      <View style={styles.pageMargin}>
        <View style={styles.userSection}>
          <Text style={styles.paddingB}>FECHA DE RETIRO: {pickupDay}</Text>
          <Text style={styles.paddingB}>FECHA DE DEVOLUCIÓN: {returnDay}</Text>
          <Text style={styles.paddingB}>CANTIDAD DE JORNADAS: ?</Text>
          <Text style={styles.paddingB}>
            PRECIO ACORDADO: {formatPrice(order.totalPrice)}
          </Text>
          <View style={styles.flex}>
            <Text style={styles.paddingB}>RETIRA: {order.user.fullName}</Text>
            <Text style={styles.paddingB}>DNI: {order.user.dniNumber}</Text>
          </View>
          <Text style={styles.paddingB}>
            IMPORTANTE VER CONDICIONES ANEXO I
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={{ marginBottom: 5 }}>LISTA DE EQUIPOS RETIRADOS</Text>
          {order.equipments.length > 0 &&
            order.equipments.map((gear) => (
              <Text style={styles.equipment}>
                x{" "}
                {
                  gear.bookings.filter(
                    (book) => book.bookId === order.booking.id
                  )[0].quantity
                }{" "}
                {gear.name} {gear.brand} {gear.model}
              </Text>
            ))}
        </View>
        <View style={styles.bottomSigns}>
          <Text style={styles.signs}>FIRMA DEL RESPONSABLE DE PRODUCCIÓN</Text>
          <Text style={styles.signs}>FIRMA DEL RESPONSABLE DEl RENTAL</Text>
        </View>
      </View>
      <View style={styles.bottomPage}>
        <Text>2022. GUANACO RENTAL. SAN JUAN, ARGENTINA.</Text>
        <Text>Telefonos de contacto: 2644162059 - 2644627267</Text>
        <Text>www.guanacorental.com hola@guanacorental.com</Text>
      </View>
    </Page>
  </Document>
);
