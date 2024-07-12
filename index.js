const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const DbConnection = require("./config/connectDb");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const corsOption = require('./config/corsOption');
const credentials = require('./middleware/credentials');
const authenticateJWT = require('./middleware/verifyJWT')

const port = process.env.PORT || 4321;

// Middleware
app.use(credentials);
app.use(cors(corsOption));
app.use(express.json());

// Connect to MongoDB using Mongoose
DbConnection();

// JWT Middleware
app.use(authenticateJWT)

// User API
app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/user", authenticateJWT, async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/user/admin/:email", authenticateJWT, async (req, res) => {
  try {
    const email = req.params.email;
    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "Access Unauthorized" });
    }
    const user = await User.findOne({ email: email });
    const admin = user?.role === "admin" || false;
    res.send({ admin });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/user/admin/:id", authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndUpdate(
      id,
      { role: "admin" },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/user/:id", authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/user/:id", authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Category API
app.use("/category", categoryRoute);

// Product API
app.use("/product", productRoute);

app.post("/product", async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something broke!" });
});

app.get("/", (req, res) => {
  res.send("UniShop is running");
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`UniShop is running on port ${port}`));
});
