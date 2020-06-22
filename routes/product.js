const express = require('express');
const router = express.Router();


const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');

router.get('/', (req, res) => {
  Product.find({}, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
});


router.post('/add', (req, res) => {
  console.log({
    ...req.body,
    size: JSON.parse(req.body.size),
    img: JSON.parse(req.body.img)
  })
  res.json({
    done: "true"
  });
});

router.post("/findone", function (req, res) {
  Product.findById(req.body.id, (err, result) => {
    if (err) {
      if (err instanceof mongoose.CastError) {
        res.send([]);
      }
      console.log(err); return;
    }
    else {
      res.send(result);
    }
  })
});


router.post("/search", function (req, res) {
  Product.find({ name: { '$regex': req.body.search, $options: 'i' } }, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
})









module.exports = router;