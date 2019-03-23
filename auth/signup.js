const firebase = require("firebase")
const db = firebase.firestore();
const secret = "nVonHhApJpMgRyBrC6Vg";
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log(req.body)
  if (!req.body.uid) {
    return res.send({error: true, msg: "Missing fields"}).end();
  }
  if (!req.body.e) {
    return res.send({error: true, msg: "Missing fields"}).end();
  }
  if (!req.body.n) {
    return res.send({error: true, msg: "Missing fields"}).end();
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
              .send({error: true, msg: "a server error occurred"})
              .end();
          }
          res.send({token, pfp: user.pfp}).end();
        });
      });
    }
    const jwtUser = {
      uid,
      email
    };
    jwt.sign(jwtUser, secret, (err, token) => {
      if (err) {
        return res.send({error: true, msg: "a server error occurred"}).end();
      }
      res.send({token, pfp: doc.data().pfp}).end();
    });
  });
}
