const express = require("express");
const router = express.Router();
const getProduct = require('./../controllers/getProducts');

router.get("/", getProduct);

router.post("/product", async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
