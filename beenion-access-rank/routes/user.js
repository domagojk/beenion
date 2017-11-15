function userRoute({ express, ensureLoggedIn, accessRank }) {
  const router = express.Router()

  router.get('/', ensureLoggedIn, function(req, res, next) {
    res.send(req.user.userId)
  })

  return router
}

module.exports = userRoute
