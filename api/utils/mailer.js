const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

async function sendOrderSuccessEmail(data) {

  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./utils/views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./utils/views/"),
  };

  transporter.use("compile", hbs(handlebarOptions));

  let mailOptions = {
    from: "facupelli@hotmail.es",
    to: "facundopellicer4@gmail.com",
    subject: `NUEVO PEDIDO`,
    template: "orderSuccessTemplate",
    context: {
      name: `${data.user}`,
      phone: `${data.phone}`,
      email: `${data.email}`,
      dates: `${data.dates}`,
      equipment: data.equipment,
    },
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return { message: "error, mail no enviado" };
    }
    return { message: "success" };
  });
}

module.exports = { sendOrderSuccessEmail };
