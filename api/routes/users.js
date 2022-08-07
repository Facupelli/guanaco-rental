const express = require("express");
const { postUser } = require("../controllers/users.controller");
const router = express.Router();

router.post("/", postUser);

module.exports = router;
