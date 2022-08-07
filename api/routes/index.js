const { Router } = require("express");
const equipment = require("./equipment");
const users = require("./users");

const router = Router();

router.use("/equipment", equipment);
router.use("/users", users);

module.exports = router;
