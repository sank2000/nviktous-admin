const express = require('express');
const router = express.Router();


const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');


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
})








module.exports = router;