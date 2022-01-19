const express = require("express");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Importing necessary files
const database = require("./database/connection");
const userRoute = require("./routes/userRoutes");

app.use(userRoute);

app.listen(5000);
console.log("Sharemore server up and running at 5000");
