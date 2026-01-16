const express = require("express");

const router = express.Router();

const {
  createNews,
  getNearbyNews,
} = require("../controllers/news.controller.js");

router.get("/nearby", getNearbyNews);

router.post("/", createNews);

module.exports = router;
