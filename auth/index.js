const express = require('express');
const router = express.Router();

router.post("/localSignIn", require('./localSignIn'))
router.post("/redirectSignUp", require("./redirectSignUp"))

module.exports = router
