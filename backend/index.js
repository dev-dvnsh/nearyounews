const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db.js");
const locationRoutes = require("./routes/location.route.js");
const newsRoutes = require("./routes/news.route.js");

const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use("/api/v1/location", locationRoutes);
app.use("/api/v1/news", newsRoutes);

app.get("/health", (req, res) => {
  res.send("Health checked");
});

connectDB(dbURI)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
