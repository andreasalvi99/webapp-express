const express = require("express");
const app = express();
const port = 3000;
const url = "http://localhost:";
const connection = require("./database/movies");

app.listen(port, () => {
  console.log(`Server online on ${url}${port}`);
});
