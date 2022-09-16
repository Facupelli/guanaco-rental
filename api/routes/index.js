const { Router } = require("express");

const equipment = require("./equipment");
const users = require("./users");
const order = require("./order");
const book = require("./book");
const rents = require("./rents");
const coupons = require("./coupons");
const fixedDiscounts = require("./fixedDiscounts");
const log = require("./login");

const router = Router();

router.use("/log", log);

router.use("/equipment", equipment);
router.use("/users", users);
router.use("/order", order);
router.use("/book", book);
router.use("/rents", rents);
router.use("/coupons", coupons);
router.use("/fixedDiscounts", fixedDiscounts);

module.exports = router;
