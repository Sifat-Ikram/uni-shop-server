const Category = require("../models/category/category");

const getCategory = async (req, res) => {
  try {
    const result = await Category.find();
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = getCategory;