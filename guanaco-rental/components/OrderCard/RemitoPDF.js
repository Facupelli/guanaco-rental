import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { formatPrice } from "../../utils/price_formater";

// Font.register({
//   family: "Open Sans",
//   fonts: [
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
//     },
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
//       fontWeight: 600,
//     },
//     {
//       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf",
//       fontWeight: 700,
//     },
//   ],
// });

Font.register({
  family: "Panton",
  fonts: [
    {
      src: "https://db.onlinewebfonts.com/t/5920187ef0bf42859293e1ea01545b96.ttf",
    },
    {
      src: "https://db.onlinewebfonts.com/t/d5a58cd8ad7ce7bbe4716dc5b95fb0fb.ttf",
      fontWeight: 600,
    },
    {
      src: "https://db.onlinewebfonts.com/t/24398819ac2f8f57d97b6d2c131686fe.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    fontFamily: "Panton",
    position: "relative",
    zIndex: 0,
  },
  imageWrapper: {
    position: "absolute",
    width: 125,
    height: 125,
    left: "50%",
    top: 5,
    transform: "translate(-50%, 0%)",
    padding: "0px 5px",
    backgroundColor: "white",
  },
  pageMargin: {
    position: "absolute",
    top: 65,
    left: "4%",
    zIndex: -1,
    height: "88%",
    width: "92%",
    border: "2px solid black",
    borderRadius: 10,
  },
  userSection: {
    borderBottom: "2px solid black",
    padding: 20,
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "3px 0",
  },
  flexItem: {
    flexBasis: "50%",
  },
  equipmentWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 25,
    marginRight: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  equipment: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 11,
    flexBasis: "46%",
    marginRight: "4%",
  },
  bold: {
    fontWeight: 600,
  },
  accessories: {
    fontSize: 8,
    paddingLeft: 2,
  },
  equiposRetirados: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 5,
    fontWeight: 700,
    marginLeft: 25,
  },
  breakMargin: {
    marginTop: 75,
  },
  bgImageWrapper: {
    width: "92%",
    height: 450,
    position: "absolute",
    zIndex: 0,
    top: "35%",
    left: 25,
    opacity: 0.2,
  },
  bgImage: {
    width: "100%",
    objectFit: "contain",
    marginLeft: "auto",
    marginRight: "auto",
  },
  bottomSigns: {
    position: "absolute",
    bottom: 0,
    left: 25,
    width: "92%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    padding: "15px 0px",
    marginBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
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
    marginTop: 50,
    marginRight: 25,
    fontSize: 10,
    paddingBottom: 10,
  },
  bottomPage: {
    position: "absolute",
    bottom: 20,
    left: 25,
    fontSize: 6,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "92%",
    paddingTop: 6,
  },
});

export const RemitoPDF = ({ pickupDay, returnDay, order, equipmentRows }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <View style={styles.number}>
        <Text>REMITO N° SJ-{order.number}</Text>
      </View>
      <View style={styles.pageMargin} fixed></View>
      <View style={styles.imageWrapper}>
        <Image src="/remito/logo-remito-low.png" alt="logo" />
      </View>

      <View style={styles.userSection}>
        <View style={styles.flex}>
          <Text>
            FECHA DE RETIRO: <Text style={styles.bold}>{pickupDay}</Text>
          </Text>
        </View>
        <View style={styles.flex}>
          <Text>
            FECHA DE DEVOLUCIÓN: <Text style={styles.bold}>{returnDay}</Text>
          </Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.flexItem}>
            CANTIDAD DE JORNADAS:{" "}
            <Text style={styles.bold}>{order.booking.dates.length}</Text>
          </Text>
          <Text style={styles.flexItem}>
            PRECIO ACORDADO:{" "}
            <Text style={styles.bold}>{formatPrice(order.totalPrice)}</Text>
          </Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.flexItem}>
            RETIRA: <Text style={styles.bold}>{order.user.fullName}</Text>
          </Text>
          <Text style={styles.flexItem}>
            DNI: <Text style={styles.bold}>{order.user.dniNumber}</Text>
          </Text>
        </View>
        <View style={styles.flex}>
          <Text>
            IMPORTANTE: <Text style={styles.bold}>VER CONDICIONES ANEXO I</Text>
          </Text>
        </View>
      </View>

      <View style={styles.bgImageWrapper}>
        <Image
          src="/remito/guanaco-perfil-low.png"
          alt="guanaco-fondo"
          style={styles.bgImage}
        />
      </View>
      <Text style={styles.equiposRetirados}>LISTA DE EQUIPOS RETIRADOS</Text>

      {equipmentRows.length > 0 &&
        equipmentRows.map((equipment, i) => {
          return (
            <View
              key={i}
              break={i === 6 || i === 13}
              style={[
                styles.equipmentWrapper,
                { marginTop: i === 6 || i === 13 ? 85 : 0 },
              ]}
            >
              {equipment.map((gear) => (
                <View style={styles.equipment} key={gear.id}>
                  <Text style={styles.bold}>
                    x{" "}
                    {
                      gear.bookings.filter(
                        (book) => book.bookId === order.booking.id
                      )[0].quantity
                    }{" "}
                    {gear.name} {gear.brand} {gear.model}
                  </Text>
                  <Text style={styles.accessories}>
                    {gear.accessories.length > 0 ? "Con" : null}{" "}
                    {gear.accessories}.
                  </Text>
                </View>
              ))}
            </View>
          );
        })}

      {/* <View break style={styles.equipmentWrapper}>
          {order.equipments.length > 0 &&
            order.equipments.map((gear, i) => {
              return (
                <View break={i === 28} style={styles.equipment} key={gear.id}>
                  <Text style={styles.bold}>
                    x{" "}
                    {
                      gear.bookings.filter(
                        (book) => book.bookId === order.booking.id
                      )[0].quantity
                    }{" "}
                    {gear.name} {gear.brand} {gear.model}
                  </Text>
                  <Text style={styles.accessories}>
                    {gear.accessories.length > 0 ? "Con" : null}{" "}
                    {gear.accessories}.
                  </Text>
                </View>
              );
            })}
        </View> */}

      <View fixed style={styles.bottomSigns}>
        <Text style={styles.signs}>FIRMA DEL RESPONSABLE DE PRODUCCIÓN</Text>
        <Text style={styles.signs}>FIRMA DEL RESPONSABLE DEl RENTAL</Text>
      </View>
      <View fixed style={styles.bottomPage}>
        <Text>2022. GUANACO RENTAL. SAN JUAN, ARGENTINA.</Text>
        <Text>Telefonos de contacto: 2644162059 - 2644627267</Text>
        <Text>www.guanacorental.com hola@guanacorental.com</Text>
      </View>
    </Page>
  </Document>
);
