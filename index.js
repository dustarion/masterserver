const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const atob = require("atob");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const secret = "nVonHhApJpMgRyBrC6Vg";

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

const db = firebase.firestore();

app.post("/localSignIn", (req, res) => {
  if (!req.body.uid) {
    return res.send({ error: true, msg: "Missing fields" }).end();
  }
  if (!req.body.e) {
    return res.send({ error: true, msg: "Missing fields" }).end();
  }
  const uid = req.body.uid;
  const email = req.body.email;
  const ref = db.collection("users").doc(uid);
  ref.get().then(doc => {
    if (!doc.exists) {
      return res.send({ error: true, msg: "User does not exist" });
    }
    const user = {
      uid,
      email
    };
    jwt.sign(user, secret, (err, token) => {
      if (err) {
        return res.send({ error: true, msg: "a server error occurred" });
      }
      res.send(token).end();
    });
  });
});

app.listen(8080);
