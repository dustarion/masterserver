const firebase = require("firebase")
const db = firebase.firestore();
const secret = "nVonHhApJpMgRyBrC6Vg";
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  console.log(req.body)
  if (!req.body.token) {
    return res.send({error: true, msg: "Missing Data"}).end();
  }
  const token = req.body.token;
  jwt.verify(token, secret, (err, content) => {
    if (err) {
      return res.send({error: true, msg: "Verification Failed"}).end();
    }
    const uid = content.uid;
    const ref = db.collection("users").doc(uid);
    const sRef = db.collection("sets");
    ref.get().then(doc => {
      if (!doc.exists) {
        return res
          .send({error: true, msg: "Please try logging in again"})
          .end();
      }
      var sets = [];
      if (doc.data().sets.length == 0) {
        return res.send(sets).end();
      }
      doc.data().sets.forEach(id => {
        sRef
          .doc(id)
          .get()
          .then(sDoc => {
            if (!sDoc.exists) {
              return res
                .send({error: true, msg: "a server error occurred"})
                .end();
            }
            sets.push(sDoc.data());
            if (sets.length == doc.data().sets.length) {
              res.send(sets).end();
            }
          });
      });
    });
  });
}
