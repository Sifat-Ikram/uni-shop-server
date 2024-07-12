const Product = require('../models/product/product');

const getProduct = async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = getProduct;