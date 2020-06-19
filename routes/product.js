const express = require('express');
const router = express.Router();


const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');


router.post('/add', (req, res) => {
  console.log(req.body);
  res.json({
    done: "true"
  });
});










module.exports = router;