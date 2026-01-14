const express = require("express");
const Location = require("../models/Location.js");
const receiveLocation = async (req, res) => {
  try {
    // reading data from req body
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const location = new Location({
      latitude,
      longitude,
    });

    await location.save();
    return res.status(201).json({
      sucess: true,
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
