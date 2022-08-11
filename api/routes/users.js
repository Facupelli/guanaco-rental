const express = require("express");
const { postUser, getUsers } = require("../controllers/users.controller");
const router = express.Router();

router.post("/", postUser);
router.get("/", getUsers);

module.exports = router;
