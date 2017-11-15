function eventRoute({ express, ensureLoggedIn, accessRank }) {
  const router = express.Router()

  router.post('/add', ensureLoggedIn, function(req, res, next) {
    res.send(req.user.userId)
  })

  return router
}

module.exports = eventRoute
