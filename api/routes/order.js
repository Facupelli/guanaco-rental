const express = require("express");
const {
  postOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
  putOrder,
} = require("../controllers/order.controller");
const router = express.Router();

router.post("/", postOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrderById);
router.put("/", putOrder);


module.exports = router;
