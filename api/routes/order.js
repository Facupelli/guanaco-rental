const express = require("express");
const {
  postOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
  putOrder,
  getTotalOfOrders,
} = require("../controllers/order.controller");
const router = express.Router();

router.post("/", postOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrderById);
router.put("/", putOrder);

router.get("/rents", getTotalOfOrders);

module.exports = router;
