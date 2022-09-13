const { Router } = require("express");

const equipment = require("./equipment");
const users = require("./users");
const order = require("./order");
const book = require("./book");
const rents = require("./rents");
const coupons = require("./coupons");

const router = Router();

router.use("/equipment", equipment);
router.use("/users", users);
router.use("/order", order);
router.use("/book", book);
router.use("/rents", rents);
router.use("/coupons", coupons);

module.exports = router;
