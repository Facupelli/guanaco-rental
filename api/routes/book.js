const express = require("express");
const { getBookingsByDate } = require("../controllers/book.controller");
const router = express.Router();

router.get("/", getBookingsByDate);

module.exports = router;
