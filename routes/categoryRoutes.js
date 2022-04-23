const express = require("express");

//Creating a router
const router = new express.Router();

//Importing necessary files
const Category = require("../models/categoryModel");

//Creating a category
router.post("/create", function (req, res) {
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

//Get Categories
router.get("/", function (req, res) {
  Category.find()
    .then(function (data) {
      res.json({ msg: data, success: true });
    })
    .catch(function (e) {
      res.json({ msg: `Cannot fetch categories ${e}`, success: false });
    });
});

//Delete Categories
router.delete("/delete/:category_id", function (req, res) {
  const category_id = req.body.category_id;
  Category.findByIdAndDelete(category_id)
    .then(res.json({ msg: "Category Deleted", success: true }))
    .catch((e) => {
      res.json({ msg: `Category deletion failed ${e}`, success: false });
    });
});

module.exports = router;
