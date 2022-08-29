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

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    fontFamily: "Open Sans",
  },
  imageWrapper: {
    width: 125,
    height: 125,
    position: "absolute",
    zIndex: 5,
    left: "50%",
    top: -60,
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
    padding: "3px 0",
    margin: "3px 0",
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
    marginTop: 10,
  },
  equipment: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    flexBasis: "48%",
    marginRight: "2%",
  },
  bold: {
    fontWeight: 600,
  },
  accessories: {
    fontSize: 8,
    paddingLeft: 2,
  },
  section: {
    padding: 20,
    height: "100%",
    position: "relative",
  },
  bgImageWrapper: {
    width: "100%",
    height: 450,
    position: "absolute",
    zIndex: 0,
    top: 50,
    left: 20,
    opacity: 0.2,
  },
  bgImage: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  bottomSigns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    padding: "15px 0px",
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
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

export const RemitoPDF = ({ pickupDay, returnDay, order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.number}>
        <Text>REMITO N° SJ-{order.number}</Text>
      </View>
      <View style={styles.pageMargin}>
        <View style={styles.imageWrapper}>
          <Image src="/remito/logo-remito-low.png" alt="logo"/>
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
              IMPORTANTE:{" "}
              <Text style={styles.bold}>VER CONDICIONES ANEXO I</Text>
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.bgImageWrapper}>
            <Image src="/remito/guanaco-perfil-low.png" alt="guanaco-fondo" style={styles.bgImage} />
          </View>
          <Text style={{ marginBottom: 3, fontWeight: 700 }}>
            LISTA DE EQUIPOS RETIRADOS
          </Text>
          <View style={styles.equipmentWrapper}>
            {order.equipments.length > 0 &&
              order.equipments.map((gear) => (
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
