const express = require("express");
const {
  postCoupon,
  getCoupons,
  deleteCouponById,
  getCouponByName,
} = require("../controllers/coupons.controller");
const router = express.Router();

router.post("/", postCoupon);
router.get("/", getCoupons);
router.get("/:name", getCouponByName);
router.delete("/:id", deleteCouponById);

module.exports = router;
