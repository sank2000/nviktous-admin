const express = require('express');
const router = express.Router();


const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');


router.get('/product', (req, res) => {
  if (!req.session.user) { res.send("unauthorised"); }
  Product.countDocuments({}, (err, result) => {
    if (err) { console.log(err); return; }
    res.json({ count: result });
  })
});


router.get('/user', (req, res) => {
  if (!req.session.user) { res.send("unauthorised"); }
  User.countDocuments({}, (err, result) => {
    if (err) { console.log(err); return; }
    res.json({ count: result });
  })
});



router.get('/order', (req, res) => {
  if (!req.session.user) { res.send("unauthorised"); }
  Order.countDocuments({}, (err, result) => {
    if (err) { console.log(err); return; }
    res.json({ count: result });
  })
})










module.exports = router;