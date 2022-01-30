const express = require("express");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Importing necessary files
const database = require("./database/connection");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const categoryRoute = require("./routes/categoryRoutes");

app.use(userRoute);
app.use(postRoute);
app.use(categoryRoute);

app.listen(5000);
console.log("Sharemore server up and running at 5000");
