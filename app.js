const express = require("express");

var app = express();

const port = 90;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
