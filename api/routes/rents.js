const express = require("express");
const {
  getTotalOfOrders,
} = require("../controllers/rents.controller");
const router = express.Router();

router.get("/rents", getTotalOfOrders);

module.exports = router;