import articleCommandHandlers from '../../beenion-core/commandHandlers/article'
import journalCommandHandlers from '../../beenion-core/commandHandlers/journal'
import userCommandHandlers from '../../beenion-core/commandHandlers/user'
const express = require('express')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()
const router = express.Router()

// todo: implement repositories
const userRepository = {}
const journalRepository = {}
const articleRepository = {}

const handlers = {
  ...articleCommandHandlers(userRepository, journalRepository, articleRepository),
  ...journalCommandHandlers(userRepository, journalRepository),
  ...userCommandHandlers(userRepository, journalRepository)
}

router.post('/', ensureLoggedIn, async function (req, res, next) {
  const commandHandler = handlers[req.body.command.name]

  if (!commandHandler) {
    throw new Error('no command handler found')
  }

  try {
    await commandHandler({
      userId: req.user.userId,
      payload: req.body.command.payload
    })

    res.send('command accepted')
  } catch (e) {
    // todo: handle
    throw e
  }
})
