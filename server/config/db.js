const mongoose = require("mongoose");
// const db = config.get("mongoURI");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Currently using mongoUI_TEST_STAGE for storing testing data
    // Switch to mongoURI for production data
    await mongoose.connect(process.env.mongoURI_TEST_STAGE, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("MongoDB Connected.");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;
