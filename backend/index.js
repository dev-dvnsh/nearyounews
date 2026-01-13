const express = require("express");
const connectDB = require("./config/db.js");

//import routes
const locationRoutes = require("./routes/location.route.js");
const PORT = 5000;
const dbURI =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.8";
//Connect to Database
connectDB(dbURI);

// Express middleware
const app = express();
//body parser middleware
app.use(express.json());

// location.route all routers will be resolved on /location/
app.use("/location", locationRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/health", (req, res) => {
  res.send("Health checked");
});
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
