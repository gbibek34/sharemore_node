const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Creating a router
const router = new express.Router();

//Importing necessary files
const Category = require("../models/categoryModel");

//Creating a category
router.post("/category/create", function (req, res) {
  const name = req.body.name;
  Category.findOne({ name: name })
    .then(function (data) {
      console.log(data); //!Testing
      if (data != null) {
        res.json({ msg: "Category already exists", success: false });
        return;
      } else {
        const categoryData = new Category(req.body);
        categoryData.save();
        res.json({ msg: "Category created successfully", success: true });
      }
    })
    .catch(function (e) {
      res.json({ msg: `Category creation failed ${e}`, success: true });
    });
});

module.exports = router;
