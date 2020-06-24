const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');


const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');

router.get('/', (req, res) => {
  if (!req.session.user) { res.send("unauthorised"); }
  Product.find({}, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
});


router.post('/add', (req, res) => {
  if (!req.session.user) { res.send("unauthorised"); }
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
  if (!req.session.user) { res.send("unauthorised"); }
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
  if (!req.session.user) { res.send("unauthorised"); }
  Product.find({ name: { '$regex': req.body.search, $options: 'i' } }, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
})


router.post("/update", function (req, res) {
  if (!req.session.user) { res.send("unauthorised"); }
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
  if (!req.session.user) { res.send("unauthorised"); }
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
  if (!req.session.user) { res.send("unauthorised"); }
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