const express = require("express");
const { postOrder, getOrders, deleteOrderById } = require("../controllers/order.controller");
const router = express.Router();

router.post("/", postOrder);
router.get("/", getOrders);
router.delete("/:id", deleteOrderById);


module.exports = router;
