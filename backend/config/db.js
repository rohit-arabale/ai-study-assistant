const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error.message);

    if (error.message.includes("querySrv ENOTFOUND")) {
      console.error(
        "Check that your MongoDB Atlas connection string uses the exact cluster host from Atlas."
      );
    }

    process.exit(1);
  }
};

module.exports = connectDB;
