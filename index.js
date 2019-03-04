const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("tf");
});

app.post("/post", (req, res) => {
  res.end("posted");
});

app.listen(8080);
