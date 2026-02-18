const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db.js");
const locationRoutes = require("./routes/location.route.js");
const newsRoutes = require("./routes/news.route.js");

const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;

const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Add root route
app.get("/", (req, res) => {
  res.json({ 
    message: "NearYouNews API", 
    version: "1.0.0",
    endpoints: {
      health: "/health",
      location: "/api/v1/location",
      news: "/api/v1/news"
    }
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use("/api/v1/location", locationRoutes);
app.use("/api/v1/news", newsRoutes);

connectDB(dbURI)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
