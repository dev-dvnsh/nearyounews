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
      coordinates: [longitude, latitude],
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

const getNearbyNews = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    //1 Basic Validation
    if (!lat || !lng || !radius) {
      return res.status(400).json({
        success: false,
        message: "latitude, longitude and radius are required",
      });
    }

    const latitude = Number(lat);
    const longitude = Number(lng);
    const maxDistance = Number(radius);

    // 2 Type Validation
    if (
      Number.isNaN(latitude) ||
      Number.isNaN(longitude) ||
      Number.isNaN(maxDistance)
    ) {
      return res.status(400).json({
        success: false,
        message: "latitude, longitude and radius must be numbers",
      });
    }

    //3 Range validation
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

    if (maxDistance <= 0 || maxDistance > 50000) {
      return res.status(400).json({
        success: false,
        message: "Radius must be between 1 and 50000 meters",
      });
    }

    // 4 Geo query
    const news = await News.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "distance",
          maxDistance: maxDistance,
          spherical: true,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      count: news.length,
      data: news,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
module.exports = {
  createNews,
  getNearbyNews,
};
