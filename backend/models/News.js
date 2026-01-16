const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [lat,long]
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

//Geo index for distance/radius queries
newsSchema.index({ location: "2dsphere" });

// TTL: auto delete news after 7 days
newsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

const News = mongoose.model("News", newsSchema);
module.exports = News;
