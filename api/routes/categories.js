const express = require("express");
const { getCategories } = require("../controllers/categories.controller.js");
const router = express.Router();

router.get("/", getCategories);

module.exports = router;
