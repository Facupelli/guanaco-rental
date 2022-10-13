const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");

const NODEMAILER_G_APP = process.env.NODEMAILER_G_APP;

async function sendMail(mailOptions) {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hola@guanacorental.com",
        pass: NODEMAILER_G_APP,
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

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
}

module.exports = { sendMail };
