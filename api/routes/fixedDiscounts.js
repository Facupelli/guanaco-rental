const express = require("express");
const {
  getFixedDiscounts,
  postFixedDiscount,
  putFixedDiscount
} = require("../controllers/fixedDiscounts.controller");
const router = express.Router();

router.post("/", postFixedDiscount);
router.put("/", putFixedDiscount);
router.get("/", getFixedDiscounts);


module.exports = router;
