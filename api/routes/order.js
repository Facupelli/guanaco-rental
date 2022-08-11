const express = require("express");
const { postOrder, getOrders } = require("../controllers/order.controller");
const router = express.Router();

router.post("/", postOrder);
router.get("/", getOrders);

module.exports = router;
