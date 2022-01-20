const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Creating a router
const router = new express.Router();

//Importing necessary files
const User = require("../models/userModel");

//Register a user
router.post("/user/register", function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ username: username })
    .then(function (data) {
      console.log(data); //!Testing
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

//Login
router.post("/user/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username }).then(function (userData) {
    if (userData === null) {
      return res.json({ msg: "Invalid Username, Try Again!" });
    } else {
      bcrypt.compare(password, userData.password, (e, result) => {
        if (result === false) {
          return res.json({ message: "Invalid Password, Try Again!" });
        }
        const token = jwt.sign({ cid: userData._id }, "anysecretkey");
        res.json({ token: token, success: true });
      });
    }
  });
});

//Page not found
router.get("*", function (req, res) {
  res.json({ msg: "Page not found", success: false });
});

module.exports = router;
