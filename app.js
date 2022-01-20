const express = require("express");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Importing necessary files
const database = require("./database/connection");
const userRoute = require("./models/userModel");

const port = 90;

app.use(userRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
