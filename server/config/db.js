const mongoose = require("mongoose");
// const db = config.get("mongoURI");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
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
