const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 5;

const User = require('../model/admin');

router.get("/", function (req, res) {
  /*
   To get details about current user
   password: 0 => to hide password from result
  */
  if (req.session.user) {
    User.findById(req.session.user, { password: 0 }, function (err, result) {
      if (!err) {
        res.json({
          ...result._doc,
          message: 'You are signed in!',
          auth: true,
        });
      }
    });
  }
  else {
    res.json({
      message: 'You are not logged in!',
      auth: false,
    });
  }
})

router.post("/signup", function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const userData = new User({
      ...req.body,
      password: hash
    });
    userData.save()
      .then((result) => {
        req.session.user = userData._id;
        const { password, ...Data } = userData._doc;
        res.json({
          ...Data,
          message: 'Account created successfully.',
          auth: true,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.json({
            message: 'Error creating account : Account already exists',
            auth: false,
          });
        }
        else {
          res.json({
            message: 'Unable to create account : Error - ' + err.code,
            auth: false,
          });
        }
      });
  });
});

router.post("/signin", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      res.json({
        message: 'user name not exits',
        auth: false,
      });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        req.session.user = user._id;
        const { password, ...Data } = user._doc;
        res.json({
          ...Data,
          message: `Welcome ${user.name}!`,
          auth: true,
        });
      }
      else {
        res.json({
          message: 'Incorrect Password',
          auth: false,
        });
      }
    });
  } catch (err) {
    console.log('Error: Mongo DB server rejected the request!' + err);
  }
});

router.get("/signout", (req, res) => {
  req.session.destroy(function (err) {
    res.json({
      auth: false,
    });
  });
});

router.get("/user", (req, res) => {
  if (req.session.user) {
    User.findById(req.session.user, { password: 0 }, function (err, result) {
      if (!err) {
        res.json(result);
      }
    });
  }
  else { res.send("unauthorised"); }

})




module.exports = router;
