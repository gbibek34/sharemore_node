const express = require("express");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const database = require("./database/connection");

const port = 90;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
