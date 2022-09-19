const express = require("express");
const {
  postCoupon,
  getCoupons,
  deleteCouponById,
  getCouponByName,
} = require("../controllers/coupons.controller");
const { authorization } = require("../utils/middlewares/authorization");
const router = express.Router();

router.post("/", authorization, postCoupon);
router.get("/", getCoupons);
router.get("/:name", getCouponByName);
router.delete("/:id", authorization, deleteCouponById);

module.exports = router;
