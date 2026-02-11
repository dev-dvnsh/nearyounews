const express = require("express");

const router = express.Router();

const {
  createNews,
  getNearbyNews,
} = require("../controllers/news.controller.js");
const uploadNewsImage = require("../middlewares/uploadNewsImage.middleware.js");
router.get("/nearby", getNearbyNews);

router.post("/create", uploadNewsImage.single("image"), createNews);

module.exports = router;
