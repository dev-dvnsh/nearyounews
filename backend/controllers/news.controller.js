const express = require("express");
const News = require("../models/News");
const createNews = async (req, res) => {
  try {
    const { content, latitude, longitude } = req.body;

    // 1 Basic presence check
    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    if (latitude == undefined || longitude == undefined) {
      return res.status(400).json({
        success: false,
        message: "Location with latitude and longitude is required",
      });
    }

    // 2 Type check
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude must be numbers",
      });
    }

    // 3 Range Validation
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

    // Transform into GeoJSON
    const location = {
      type: "Point",
      coordinate: [longitude, latitude],
    };

    // Save to MongoDB
    const news = new News({
      content,
      location,
    });

    await news.save();

    return res.status(201).json({
      success: true,
      message: "News created successfully",
      data: news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createNews,
};
