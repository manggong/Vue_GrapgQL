const express = require("express");
const { join } = require("path");

const app = express();

app.listen(4000, () => {
  console.log("server running 4000");
});
