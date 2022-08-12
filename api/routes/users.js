const express = require("express");
const {
  postUser,
  getUsers,
  putUser,
} = require("../controllers/users.controller");
const router = express.Router();

router.post("/", postUser);
router.put("/", putUser);
router.get("/", getUsers);

module.exports = router;
