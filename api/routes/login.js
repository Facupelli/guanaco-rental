const express = require("express");
const { login, logout } = require("../controllers/login.controller");
const router = express.Router();

router.post("/", login);
router.get("/", logout);

module.exports = router;
