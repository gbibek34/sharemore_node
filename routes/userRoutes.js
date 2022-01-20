const express = require("express");
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");

//Creating a router
const router = new express.Router();

//Importing necessary files
const User = require("../models/userModel");

//Register a user
router.post("user/register", function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ username: username })
    .then(function (data) {
      if (data != null) {
        res.json({ msg: "Username already exists", success: false });
        return;
      } else {
        bcrypt.hash(password, 10, function (err, hashed_password) {
          const userData = new User({
            username: username,
            email: email,
            password: hashed_password,
          });
          userData.save();
          res.json({ msg: "User registered successfully", success: true });
        });
      }
    })
    .catch(function (e) {
      res.json({ msg: `User creation failed ${e}`, success: false });
    });
});

//Page not found
app.get("*", function (req, res) {
  res.json({ msg: "Page not found", success: false });
});

module.exports = router;
