const express = require('express');
const router = express.Router();


const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');


router.get('/product', (req, res) => {
  Product.find({}, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
});


router.get('/user', (req, res) => {
  User.find({}, { password: 0 }, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
});



router.get('/order', (req, res) => {
  Order.find({}, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
})










module.exports = router;