const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser());

app.get("/", (req, res) => {
  res.send("tf");
});

app.post("/post", (req, res) => {
  res.end("posted");
  console.log(req.body);
});

app.listen(8080);
