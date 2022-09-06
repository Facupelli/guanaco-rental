const express = require("express");
const {
  postOrder,
  getOrders,
  deleteOrderById,
  putOrder,
  getTotalOfOrders,
} = require("../controllers/order.controller");
const router = express.Router();

router.post("/", postOrder);
router.get("/", getOrders);
router.delete("/:id", deleteOrderById);
router.put("/", putOrder);

router.get("/rents", getTotalOfOrders);

module.exports = router;
