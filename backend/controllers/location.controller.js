const express = require("express");
const Location = require("../models/Location.js");
const receiveLocation = async (req, res) => {
  try {
    // reading data from req body
    const { latitude, longitude } = req.body;
    console.log(latitude, longitude);
    // 1️⃣ Check presence (undefined / null)
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    // 2️⃣ Check type
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude must be numbers",
      });
    }

    // 3 Check valid ranges
    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({
        success: false,
        message: "Latitude must be between -90 and 90",
      });
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({
        success: false,
        message: "Longitude must be between -180 and 180",
      });
    }

    const location = new Location({
      latitude,
      longitude,
    });

    await location.save();

    return res.status(201).json({
      success: true,
      message: "Location saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  receiveLocation,
};
