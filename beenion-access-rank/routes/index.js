function indexRoute({ express, passport, accessRank }) {
  const router = express.Router()

  router.get('/', function(req, res, next) {
    if (res.locals.loggedIn) {
      return res.send('logged in')
    }
    return res.send('not logged in')
  })

  router.get('/login', passport.authenticate('auth0', {
    clientID: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    redirectUri: process.env.AUTH0_CALLBACK_URL,
    responseType: 'code',
    audience: 'https://' + process.env.AUTH0_DOMAIN + '/userinfo',
    scope: 'openid profile'
  }),
  function(req, res) {
    res.redirect('/')
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  router.get('/callback', passport.authenticate('auth0', {
    failureRedirect: '/failure'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user')
  })

  router.get('/failure', function(req, res) {
    var error = req.flash('error')
    var error_description = req.flash('error_description')
    req.logout()
    res.send(error_description[0])
  })

  return router
}

module.exports = indexRoute
