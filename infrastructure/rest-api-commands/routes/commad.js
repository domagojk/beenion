const handlers = nesto(dependencies)

function (command) {
  const commandHandler = handlers[command.name]

  if (!commandHandler) {
    throw 'no.'
  }

  try {
    commandHandler({
      userId: req.authenticatedUserId,
      payload: command.payload
    })
  } catch(e) {
    handle(e)
  }
}