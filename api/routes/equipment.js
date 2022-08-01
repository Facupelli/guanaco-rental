const express = require("express");
const { getEquipment } = require("../controllers/equipment.controller");
const router = express.Router();

router.get("/", getEquipment);

module.exports = router;
