const express = require("express");
const connectDB = require("./config/db.js");
require("dotenv").config();
//import routes
const locationRoutes = require("./routes/location.route.js");
const newsRoutes = require("./routes/news.route.js");
const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;
//Connect to Database
connectDB(dbURI);

// Express middleware
const app = express();
//body parser middleware
app.use(express.json());

// make uploads public
app.use("/uploads", express.static("uploads"));
// location.route all routers will be resolved on /location/
app.use("/api/v1/location", locationRoutes);
app.use("/api/v1/news", newsRoutes);

app.get("/health", (req, res) => {
  res.send("Health checked");
});
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
