const mongoose = require("mongoose");

const connection = mongoose
  .connect("mongodb://localhost:27017/sharemore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Database connection established..."))
  .catch((error) => {
    console.log(`Failed due to ${error}`);
  });

module.exports = connection;
