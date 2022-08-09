const { Router } = require("express");
const equipment = require("./equipment");
const users = require("./users");
const order = require("./order");

const router = Router();

router.use("/equipment", equipment);
router.use("/users", users);
router.use("/order", order);

module.exports = router;
