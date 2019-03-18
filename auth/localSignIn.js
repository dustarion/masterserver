const firebase = require("firebase")
const db = firebase.firestore();
const secret = "nVonHhApJpMgRyBrC6Vg";
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
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
}
