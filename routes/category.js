const express = require("express");
const router = express.Router();
const getCategory = require('./../controllers/getCategory');

router.get('/', getCategory);

module.exports = router;