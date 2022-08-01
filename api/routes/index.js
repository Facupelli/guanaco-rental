const { Router } = require("express");
const equipment = require("./equipment");

const router = Router();

router.use("/equipment", equipment);

module.exports = router;
