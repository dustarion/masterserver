const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const firebase = require("firebase");

app.use(cors());
app.use(bodyParser());

var config = {
  apiKey: "AIzaSyAcYSb9fvk2vUiRhavsKlrcrpnyFKtzXTQ",
  authDomain: "master-eb220.firebaseapp.com",
  databaseURL: "https://master-eb220.firebaseio.com",
  projectId: "master-eb220",
  storageBucket: "master-eb220.appspot.com",
  messagingSenderId: "1086655103908"
};

firebase.initializeApp(config);

app.use("/auth", require("./auth"))

app.listen(8080);
