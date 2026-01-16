const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      latitude: {
        type: Number,
        require: true,
      },
      longitude: {
        type: Number,
        require: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

// TTL: auto delete news after 7 days
newsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

const News = mongoose.model("News", newsSchema);
module.exports = News;
