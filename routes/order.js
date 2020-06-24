const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');


const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');


router.get('/', (req, res) => {
  if (!req.session.user) { res.send("unauthorised"); }
  Order.find({}, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
});




router.post('/status', (req, res) => {
  if (!req.session.user) { res.send("unauthorised"); }
  let status = JSON.parse(req.body.status);
  Order.findByIdAndUpdate(req.body.id, { status: status }, { new: true }, (err, result1) => {
    if (err) {
      console.log(err);
      return;
    }
    else {
      User.findByIdAndUpdate(req.body.user_id, { $pull: { items: { _id: mongoose.Types.ObjectId(req.body.id) } } }, { new: true },
        function (err, result2) {
          if (err) {
            console.log(err);
          } else {
            const { user_id, ...data } = result1._doc;
            User.findByIdAndUpdate(req.body.user_id, { $push: { items: { ...data } } }, { new: true },
              function (err, result3) {
                if (err) {
                  console.log(err);
                }
                else {
                  res.json(
                    {
                      done: "true"
                    }
                  )
                }
              });
          }
        });
    }
  });

});







module.exports = router;