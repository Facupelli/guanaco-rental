const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const routes = require("./routes/index");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

app.use("/", routes);

// Error catching endware.
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
