const express = require("express");
const { getTotalOfOrders } = require("../controllers/rents.controller");
const { authorization } = require("../utils/middlewares/authorization");
const router = express.Router();

router.get("/", authorization, getTotalOfOrders);

module.exports = router;
