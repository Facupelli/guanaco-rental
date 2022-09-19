const express = require("express");
const {
  postOrder,
  getOrders,
  getOrderById,
  deleteOrderById,
  putOrder,
} = require("../controllers/order.controller");
const { authorization } = require("../utils/middlewares/authorization");
const router = express.Router();

router.post("/", postOrder);
router.get("/", authorization, getOrders);
router.get("/:id", getOrderById);
router.delete("/:id", authorization, deleteOrderById);
router.put("/", authorization, putOrder);

module.exports = router;
