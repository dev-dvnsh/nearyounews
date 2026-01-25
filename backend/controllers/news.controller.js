const express = require("express");
const News = require("../models/News");
const createNews = async (req, res) => {
  try {
    const { content, latitude, longitude } = req.body;

    console.log(content, latitude, longitude);
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
    const {
      lat,
      lng,
      radius,
      sort = "distance",
      page = 1,
      limit = 10,
    } = req.query;

    console.log(lat, lng);
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

    // to skip already shown news items
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Sorting
    let sortStage = {};
    if (sort === "latest") {
      sortStage = { createdAt: -1 };
    } else {
      // default = nearest first
      sortStage = { distance: 1 };
    }

    // 4 Geo query
    const news = await News.aggregate([
      {
        // $geoNear gives the nearest to any lat and long, is a mongodb aggreagate pipeline, is also gives ditance between two locations
        $geoNear: {
          // near will have users current location, db wil measure from here
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "distance",
          maxDistance: maxDistance,
          spherical: true,
        },
      },
      {
        $addFields: {
          distanceKm: { $divide: ["$distance", 1000] },
        },
      },
      { $sort: sortStage },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limitNumber },
            { $project: { content: 1, distanceKm: 1, createdAt: 1, _id: 0 } },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]).explain("executionStats");
    console.log(news);
    // If no nearby news found
    if (!news.length) {
      return res.status(200).json({
        success: true,
        page: pageNumber,
        limit: limitNumber,
        totalNews: 0,
        totalPages: 0,
        count: 0,
        data: [],
      });
    }

    const data = news[0].data;
    const totalNews = news[0].totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalNews / limitNumber);

    return res.status(200).json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      totalNews,
      totalPages,
      count: data.length,
      data,
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
