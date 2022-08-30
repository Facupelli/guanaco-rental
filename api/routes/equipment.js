const express = require("express");
const { getEquipment, putEquipment } = require("../controllers/equipment.controller");
const router = express.Router();

router.get("/", getEquipment);
router.put("/", putEquipment);

module.exports = router;
