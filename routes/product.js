const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');


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
  const P = new Product(
    {
      ...req.body,
      size: JSON.parse(req.body.size),
      img: JSON.parse(req.body.img)
    }
  );

  P.save((err) => {
    if (err) { console.log(err); return; }
    else {
      res.json({
        done: "true"
      });
    }
  })

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


router.post("/update", function (req, res) {
  const { id, ...data } = req.body;
  Product.findByIdAndUpdate(id, data, (err, result) => {
    if (err) {
      console.log(err); return;
    }
    else {
      res.json(
        {
          done: true
        }
      )
    }
  })
});

router.post("/update2", function (req, res) {
  const { id, size, ...data } = req.body;
  let s = JSON.parse(size);
  Product.findByIdAndUpdate(id, { ...data, size: s }, (err, result) => {
    if (err) {
      console.log(err); return;
    }
    else {
      res.json(
        {
          done: true
        }
      )
    }
  })
});


router.post("/delete", function (req, res) {
  Product.findByIdAndDelete(req.body.id, (err, docs) => {
    if (err) {
      console.log(err); return;
    }
    else {
      res.json(
        {
          done: true
        }
      )
    }
  });
});








module.exports = router;