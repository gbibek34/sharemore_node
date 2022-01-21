const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

var token;

//User Verification
var verifyUser = function (req, res, next) {
  try {
    token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "anysecretkey");
    User.findOne({ _id: data.cid })
      .then(function (result) {
        req.userInfo = result;
        next();
      })
      .catch(function (e) {
        res.json({ msg: "Invalid User!", success: false });
      });
  } catch (e) {
    console.log(e);
    res.json({ msg: "Invalid Token!", success: false });
  }
};

module.exports = verifyUser;
