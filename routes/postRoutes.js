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
router.post("/user/register", function (req, res) {
    const 
});

//Page not found
router.get("*", function (req, res) {
  res.json({ msg: "Page not found", success: false });
});

module.exports = router;
