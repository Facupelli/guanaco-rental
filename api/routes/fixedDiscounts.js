const express = require("express");
const {
  getFixedDiscounts,
  postFixedDiscount,
} = require("../controllers/fixedDiscounts.controller");
const router = express.Router();

router.post("/", postFixedDiscount);
router.get("/", getFixedDiscounts);

module.exports = router;
