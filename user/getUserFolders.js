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
    const fRef = db.collection("folders");

    ref.get().then(doc => {
      if (!doc.exists) {
        return res
          .send({error: true, msg: "Please try logging in again"})
          .end();
      }
      var folders = [];
      if (doc.data().folders.length == 0) {
        return res.send(folders).end();
      }
      doc.data().folders.forEach(id => {
        fRef
          .doc(id)
          .get()
          .then(fDoc => {
            if (!fDoc.exists) {
              return res
                .send({error: true, msg: "a server error occurred"})
                .end();
            }
            sets.push(fDoc.data());
            if (folders.length == doc.data().folders.length) {
              res.send(folders).end();
            }
          });
      });
    });
  });
}
