const mongoose = require("mongoose");

const connectDB = async (URI) => {
  try {
    if (!URI) {
      throw new Error("MONGO_URI is not set");
    }

    await mongoose.connect(URI);

    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    throw err;
  }
};

module.exports = connectDB;
