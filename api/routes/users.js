const express = require("express");
const {
  postUser,
  getUsers,
  getUniqueUser,
  putUser,
} = require("../controllers/users.controller");
const router = express.Router();

router.post("/", postUser);
router.put("/", putUser);
router.get("/", getUsers);
router.get("/:email", getUniqueUser);

module.exports = router;
