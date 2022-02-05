const express = require("express");
const cors = require("cors");
const path = require("path");

var app = express();
const upload = require("./helper/fileHelper");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Importing necessary files
const database = require("./database/connection");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const categoryRoute = require("./routes/categoryRoutes");

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/category", categoryRoute);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(cors());

app.listen(5000);
console.log("Sharemore server up and running at 5000");
