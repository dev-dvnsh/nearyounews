const express = require("express");

const receiveLocation = (req, res) => {
  // reading data from req body
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: "Latitude and longitude are required",
    });
  }

  return res.status(200).json({
    sucess: true,
    message: "Location received successfully",
    data: {
      latitude,
      longitude,
    },
  });
};

module.exports = {
  receiveLocation,
};
