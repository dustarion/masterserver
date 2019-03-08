const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const atob = require("atob");
const validator = require("validator");

var config = {
  apiKey: "AIzaSyAcYSb9fvk2vUiRhavsKlrcrpnyFKtzXTQ",
  authDomain: "master-eb220.firebaseapp.com",
  databaseURL: "https://master-eb220.firebaseio.com",
  projectId: "master-eb220",
  storageBucket: "master-eb220.appspot.com",
  messagingSenderId: "1086655103908"
};
firebase.initializeApp(config);

app.use(cors());
app.use(bodyParser());

app.post("/llcllogin", (req, res) => {
  const email = atob(req.body.e);
  const pass = atob(req.body.p);
  if (!validator.isEmail(email)) {
    res.send({ error: true, message: "Email is not valid." }).end();
    return;
  }
  if (!validator.isLength(pass, { min: 6, max: undefined })) {
    res
      .send({
        error: true,
        message: "Password has to be 6 characters or more"
      })
      .end();
    return;
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then(x => {
      res.send(x).end();
    })
    .catch(error => {
      res.send({ error: true, ...error }).end();
    });
});

app.listen(8080);
