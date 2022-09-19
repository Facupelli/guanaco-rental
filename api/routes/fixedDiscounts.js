const express = require("express");
const {
  getFixedDiscounts,
  postFixedDiscount,
  putFixedDiscount,
} = require("../controllers/fixedDiscounts.controller");
const { authorization } = require("../utils/middlewares/authorization");
const router = express.Router();

router.post("/", authorization, postFixedDiscount);
router.put("/", authorization, putFixedDiscount);
router.get("/", getFixedDiscounts);

module.exports = router;
