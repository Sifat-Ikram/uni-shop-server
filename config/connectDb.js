const mongoose = require("mongoose");

const connectDb = async () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB using Mongoose");
    })
    .catch((error) => {
      console.error("Connection error:", error);
    });
};

module.exports = connectDb;
