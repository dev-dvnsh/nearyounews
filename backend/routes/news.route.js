const express = require("express");

const router = express.Router();

const { createNews } = require("../controllers/news.controller.js");

router.post("/", createNews);

module.exports = router;
