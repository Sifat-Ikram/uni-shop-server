const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('products', productSchema);
