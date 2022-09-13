const express = require("express");
const {
  postCoupon,
  getCoupons,
  deleteCouponById,
} = require("../controllers/coupons.controller");
const router = express.Router();

router.post("/", postCoupon);
router.get("/", getCoupons);
router.delete("/:id", deleteCouponById);

module.exports = router;
