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

// TTL to delete document 7 days after createdAt
locationScheme.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 7 },
);

// Create model from the schema
const Location = mongoose.model("Location", locationScheme);

module.exports = Location;
