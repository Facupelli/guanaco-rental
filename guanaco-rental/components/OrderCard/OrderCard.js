import { useState } from "react";
import { formatPrice } from "../../utils/price_formater";
import Gear from "./Gear/Gear";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";

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
    fontSize: 12,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    position: "absolute",
    zIndex: 5,
    left: "50%",
    top: -45,
    transform: "translate(-50%, 0%)",
    backgroundColor: "white",
    padding: "0px 5px",
  },
  pageMargin: {
    position: "relative",
    zIndex: 1,
    marginLeft: 25,
    marginRight: 25,
    border: "2px solid black",
    borderRadius: 10,
  },
  userSection: {
    borderBottom: "2px solid black",
    padding: 20,
    marginTop: 25,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 0",
    margin: "5px 0",
  },
  equipmentWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  equipment: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    flexBasis: "50%",
  },
  section: {
    padding: 20,
    height: "100%",
  },
  bottomSigns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    padding: "15px 0px",
    marginLeft: 25,
    marginRight: 25,
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
    marginTop: 40,
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
        <View style={styles.imageWrapper}>
          <Image src="/remito-logo.png" />
        </View>
        <View style={styles.userSection}>
          <View style={styles.flex}>
            <Text>FECHA DE RETIRO: {pickupDay}</Text>
          </View>
          <View style={styles.flex}>
            <Text>FECHA DE DEVOLUCIÓN: {returnDay}</Text>
          </View>
          <View style={styles.flex}>
            <Text>CANTIDAD DE JORNADAS: ?</Text>
          </View>
          <View style={styles.flex}>
            <Text>PRECIO ACORDADO: {formatPrice(order.totalPrice)}</Text>
          </View>
          <View style={styles.flex}>
            <Text>RETIRA: {order.user.fullName}</Text>
            <Text>DNI: {order.user.dniNumber}</Text>
          </View>
          <View style={styles.flex}>
            <Text>IMPORTANTE VER CONDICIONES ANEXO I</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={{ marginBottom: 5 }}>LISTA DE EQUIPOS RETIRADOS</Text>
          <View style={styles.equipmentWrapper}>
            {order.equipments.length > 0 &&
              order.equipments.map((gear) => (
                <View style={styles.equipment} key={gear.id}>
                  <Text>
                    x{" "}
                    {
                      gear.bookings.filter(
                        (book) => book.bookId === order.booking.id
                      )[0].quantity
                    }{" "}
                    {gear.name} {gear.brand} {gear.model}
                  </Text>
                </View>
              ))}
          </View>
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
