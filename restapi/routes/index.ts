const express = require('express')
const passport = require('passport')
const router = express.Router()

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
}

/* GET home page. */
router.get('/', function (req, res, next) {
  if (res.locals.loggedIn) {
    return res.send('logged in')
  }
  return res.send('not logged in')
})

router.get('/login', passport.authenticate('auth0', {
  clientID: env.AUTH0_CLIENT_ID,
  domain: env.AUTH0_DOMAIN,
  redirectUri: env.AUTH0_CALLBACK_URL,
  responseType: 'code',
  audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
  scope: 'openid profile'}),
  function (req, res) {
    res.redirect('/')
  })

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/failure'
  }),
  function (req, res) {
    res.redirect(req.session.returnTo || '/user')
  }
)

router.get('/failure', function (req, res) {
  let error = req.flash('error')
  let error_description = req.flash('error_description')
  req.logout()
  res.send(error_description[0])
})

module.exports = router
