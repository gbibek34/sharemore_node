const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://127.0.0.1:27017/sharemore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default connection;
