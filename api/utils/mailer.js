const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

async function sendMail(data, client) {
  const CLIENT_EMAIL = process.env.CLIENT_MAIL;
  const CLIENT_ID = process.env.MAIL_CLIENT_ID;
  const CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
  const REDIRECT_URI = process.env.MAIL_REDIRECT_URI;
  const REFRESH_TOKEN = process.env.MAIL_REFRESH;

  const OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  try {
    const accessToken = await new Promise((resolve, reject) => {
      OAuth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: CLIENT_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./api/utils/views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./api/utils/views/"),
    };

    transport.use("compile", hbs(handlebarOptions));

    let mailOptions;

    if (client) {
      mailOptions = {
        from: `Guanaco Rental <${CLIENT_EMAIL}>`,
        to: `${data.email}`,
        subject: `PEDIDO RECIBIDO`,
        template: "orderSuccessToClient",
        context: {
          fullName: `${data.fullName}`,
          pickupHour: `${data.pickupHour}`,
          pickupDay: `${data.pickupDay}`,
          returnDay: `${data.returnDay}`,
          totalPrice: `${data.totalPrice}`,
          equipment: data.equipment,
        },
      };
    } else if (client?.clientConfirmation) {
      mailOptions = {
        from: `Guanaco Rental <${CLIENT_EMAIL}>`,
        to: `${data.email}`,
        subject: `ALTA DE CLIENTE`,
        template: "clientApproved",
        context: {
          fullName: `${data.fullName}`,
        },
      };
    } else {
      mailOptions = {
        from: `Guanaco Rental <${CLIENT_EMAIL}>`,
        to: "hola@guanacorental.com",
        subject: `NUEVO PEDIDO`,
        template: "orderSuccessTemplate",
        context: {
          number: `${data.number}`,
          location: `${data.location}`,
          name: `${data.user}`,
          phone: `${data.phone}`,
          email: `${data.email}`,
          dates: `${data.dates}`,
          equipment: data.equipment,
        },
      };
    }

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (e) {
    return e;
  }
}

module.exports = { sendMail };
