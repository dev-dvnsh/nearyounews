const express = require("express");

const router = express.Router();

const { receiveLocation } = require("../controllers/location.controller");

router.post("/update", receiveLocation);

module.exports = router;
