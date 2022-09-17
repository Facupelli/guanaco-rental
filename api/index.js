const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const routes = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:3000",
  "https://guanaco-rental.vercel.app",
  "https://guanaco-rental.vercel.app/book",
  "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=461944679741-ua6d85l6i3521oo9fb007jm1ahofpik5.apps.googleusercontent.com&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fguanaco-rental.vercel.app%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=8kaj641eEK6U6xPUBLQg3yTV6Tu1Nl5Qe4zCtl5P21Q&code_challenge=qJuAG_QkL7H6aQu9-WTQR49HbxB-qILWfalXKipRMF4&code_challenge_method=S256&flowName=GeneralOAuthFlow",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// app.use("/recipe", recipeRoutes);

app.use("/", routes);

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
