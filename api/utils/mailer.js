const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

async function sendMail(mailOptions) {
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

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (e) {
    return e;
  }
}

module.exports = { sendMail };
