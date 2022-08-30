const { Router } = require("express");
const equipment = require("./equipment");
const users = require("./users");
const order = require("./order");
const book = require("./book");

const router = Router();

router.use("/equipment", equipment);
router.use("/users", users);
router.use("/order", order);
router.use("/book", book);

module.exports = router;
