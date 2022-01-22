const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Creating a router
const router = new express.Router();

//Importing necessary files
const User = require("../models/userModel");
const Post = require("../models/postModel");

const verifyUser = require("../auth/auth");

//Create a post
router.post("/post/create", function (req, res) {
  const title = req.body.title;
  Post.findOne({ title: title })
    .then(function (data) {
      console.log(data);
      if (data != null) {
        res.json({ msg: "Title already exists", success: false });
        return;
      } else {
        const postData = new Post(req.body);
        postData.save();
        res.json({ msg: "Post created successfully", success: true });
      }
    })
    .catch(function (e) {
      res.json({ msg: `Post creation failed ${e}`, success: false });
    });
});

//Page not found
router.get("*", function (req, res) {
  res.json({ msg: "Page not found", success: false });
});

module.exports = router;
