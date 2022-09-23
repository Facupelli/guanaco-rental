const express = require("express");
const {
  getEquipment,
  putEquipment,
  postEquipment,
  deleteEquipment,
} = require("../controllers/equipment.controller");
const { authorization } = require("../utils/middlewares/authorization");
const router = express.Router();

router.get("/", getEquipment);
router.put("/", authorization, putEquipment);
router.post("/", authorization, postEquipment);
router.delete("/:id", authorization, deleteEquipment);

module.exports = router;
