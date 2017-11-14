const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();

router.get('/', ensureLoggedIn, function(req, res, next) {
  res.send(req.user.userId)
});

module.exports = router;
