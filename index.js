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
  const email = req.body.e;
  const ref = db.collection("users").doc(uid);
  ref.get().then(doc => {
    if (!doc.exists) {
      return res.send({ error: true, msg: "User does not exist" }).end();
    }
    const jwtUser = {
      uid,
      email
    };
    jwt.sign(jwtUser, secret, (err, token) => {
      if (err) {
        return res.send({ error: true, msg: "a server error occurred" }).end();
      }
      res.send({ token, pfp: doc.data().pfp }).end();
    });
  });
});

app.post("/redirectSignUp", (req, res) => {
  if (!req.body.uid) {
    return res.send({ error: true, msg: "Missing fields" }).end();
  }
  if (!req.body.e) {
    return res.send({ error: true, msg: "Missing fields" }).end();
  }
  if (!req.body.n) {
    return res.send({ error: true, msg: "Missing fields" }).end();
  }
  const uid = req.body.uid;
  const email = req.body.e;
  const name = req.body.n;
  const ref = db.collection("users").doc(uid);
  ref.get().then(doc => {
    if (!doc.exists) {
      const user = {
        email,
        folders: [],
        name,
        pfp: "/static/fadedBar.png",
        sets: []
      };
      ref.set(user).then(() => {
        const jwtUser = {
          uid,
          email
        };
        jwt.sign(jwtUser, secret, (err, token) => {
          if (err) {
            return res
              .send({ error: true, msg: "a server error occurred" })
              .end();
          }
          res.send({ token, pfp: user.pfp }).end();
        });
      });
    }
    const jwtUser = {
      uid,
      email
    };
    jwt.sign(jwtUser, secret, (err, token) => {
      if (err) {
        return res.send({ error: true, msg: "a server error occurred" }).end();
      }
      res.send({ token, pfp: doc.data().pfp }).end();
    });
  });
});

app.post("/getUserSets", (req, res) => {
  // Check if token is missing
  if (!req.body.token) {
    return res.send({ error: true, msg: "Missing Data" }).end();
  }

  const token = req.body.token;
  
  // Verify Token
  jwt.verify(token, secret, (err, content) => {
    if (err) {
      return res.send({ error: true, msg: "Verification Failed"}).end();
    }

    const uid = content.uid;

    console.log(content.uid)
  })

  // Verify Token
  // var decoded => jwt.verify(token);
  // // var decoded = jwt.decode(token);
  // console.log(decoded);
  // res.end("test");
});

app.listen(8080);
