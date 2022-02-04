const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Creating a router
const router = new express.Router();

//Importing necessary files
const User = require("../models/userModel");
const Post = require("../models/postModel");

const verifyUser = require("../auth/auth");

//Register a user
router.post("/register", function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ $or: [{ username: username }, { email: email }] })
    .then(function (data) {
      console.log(data); //!Testing
      if (data !== null) {
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
router.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username }).then(function (userData) {
    if (userData === null) {
      return res.json({ msg: "Invalid Username, Try Again!", success: false });
    } else {
      bcrypt.compare(password, userData.password, (e, result) => {
        if (result === false) {
          return res.json({
            msg: "Invalid Password, Try Again!",
            success: false,
          });
        }
        const token = jwt.sign({ cid: userData._id }, "anysecretkey");
        res.json({ msg: "Login successful!", token: token, success: true });
      });
    }
  });
});

//Update User
router.put("/update/:user_id", verifyUser, function (req, res) {
  const user_id = req.params.user_id;
  const password = req.body.password;
  bcrypt.hash(password, 10, function (e, hashed_password) {
    req.body.password = hashed_password;
    User.findByIdAndUpdate(user_id, {
      $set: req.body,
    })
      .then(function () {
        res.json({ msg: "User details updated", success: true });
      })
      .catch(function (e) {
        res.json({ msg: "User update failed!", success: false });
        console.log(e);
      });
  });
});

//Delete User
router.delete("/delete/:user_id", verifyUser, function (req, res) {
  const user_id = req.params.user_id;
  const user = User.findById(user_id);
  Post.deleteMany({ username: user.username })
    .then(
      User.findByIdAndRemove(user_id)
        .then(
          res.json({ msg: "User and posts has been deleted", success: true })
        )
        .catch({ msg: "User not found!", success: false })
    )
    .catch({ msg: "User not found!", success: false });
});

//Get User
router.get("/get", verifyUser, function (req, res) {
  const user_id = req.userInfo._id;
  User.findById(user_id)
    .then(function (data) {
      res.json({ msg: data, success: true });
    })
    .catch(function (e) {
      res.json({ msg: `Cannot get user ${e}`, success: false });
    });
});

module.exports = router;
