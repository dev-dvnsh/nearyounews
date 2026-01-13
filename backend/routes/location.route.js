const express = require("express");

const router = express.Router();

const { receiveLocation } = require("../controllers/location.controller");

router.post("/", receiveLocation);

module.exports = router;
