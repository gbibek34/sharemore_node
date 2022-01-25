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
router.post("/post/create", verifyUser, function (req, res) {
  const title = req.body.title;
  const user = req.userInfo._id;
  User.findById(user).then(function (data) {
    req.body.username = data.username;
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
});

//Update Post
router.put("/post/update/:post_id", verifyUser, function (req, res) {
  const post_id = req.params.post_id;
  const user = req.userInfo._id;
  User.findById(user).then(function (data) {
    username = data.username;
    Post.findById(post_id).then(function (data) {
      console.log(username);
      if (data.username === username) {
        Post.findByIdAndUpdate(post_id, {
          $set: req.body,
        })
          .then(res.json({ msg: "Post updated successfully", success: true }))
          .catch(function (e) {
            res.json({ msg: `Post update failed ${e}`, success: true });
          });
      } else {
        res.json({ msg: "User not matched", success: false });
      }
    });
  });
});

//Delete Post
router.delete("/post/delete/:post_id", verifyUser, function (req, res) {
  const post_id = req.params.post_id;
  const user = req.userInfo._id;
  User.findById(user).then(function (data) {
    username = data.username;
    Post.findById(post_id).then(function (data) {
      console.log(username);
      if (data.username === username) {
        Post.findByIdAndDelete(post_id)
          .then(res.json({ msg: "Post deleted successfully", success: true }))
          .catch(function (e) {
            res.json({ msg: `Post deletion failed ${e}`, success: true });
          });
      } else {
        res.json({ msg: "User not matched", success: false });
      }
    });
  });
});

//Get Post
router.get("/post/:post_id", function (req, res) {
  const post_id = req.params.post_id;
  Post.findById(post_id)
    .then(function (data) {
      res.json({ msg: data, success: true });
    })
    .catch(function (e) {
      res.json({ msg: `Cannot get post ${e}`, success: false });
    });
});

module.exports = router;
