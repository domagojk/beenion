const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const dotenv = require('dotenv')
const flash = require('connect-flash')
const uuidv4 = require('uuid/v4')
const session = require('express-session')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

// load .env variables
dotenv.load()

// routes
const index = require('./routes/index')
const user = require('./routes/user')

// This will configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, {
      userId: profile._json.sub
    })
  }
)

passport.use(strategy)

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    secret: uuidv4(),
    resave: true,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Handle auth failure error messages
app.use(function(req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash('error', req.query.error)
  }
  if (req && req.query && req.query.error_description) {
    req.flash('error_description', req.query.error_description)
  }
  next()
})

// Check logged in
app.use(function(req, res, next) {
  res.locals.loggedIn = false
  if (req.session.passport && typeof req.session.passport.user != 'undefined') {
    res.locals.loggedIn = true
  }
  next()
})

const routeDeps = {
  express,
  passport,
  ensureLoggedIn
}
app.use('/', index(routeDeps))
app.use('/user', user(routeDeps))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
