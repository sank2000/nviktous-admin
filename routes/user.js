const express = require('express');
const router = express.Router();


const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');

router.get('/', (req, res) => {
  User.find({}, { password: 0 }, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
});


router.post("/search", function (req, res) {
  User.find({ name: { '$regex': req.body.search, $options: 'i' } }, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
})










module.exports = router;