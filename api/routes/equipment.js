const express = require("express");
const {
  getEquipment,
  putEquipment,
} = require("../controllers/equipment.controller");
const { authorization } = require("../utils/middlewares/authorization");
const router = express.Router();

router.get("/", getEquipment);
router.put("/", authorization, putEquipment);

module.exports = router;
