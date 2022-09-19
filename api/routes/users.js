const express = require("express");
const {
  postUser,
  getUsers,
  getUniqueUser,
  putUser,
} = require("../controllers/users.controller");
const { authorization } = require("../utils/middlewares/authorization");
const router = express.Router();

router.post("/", postUser);
router.put("/", putUser);
router.get("/", authorization, getUsers);
router.get("/:email", getUniqueUser);

module.exports = router;
