const mongoose = require("mongoose");

const locationScheme = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create model from the schema
const Location = mongoose.model("Location", locationScheme);

module.exports = Location;
