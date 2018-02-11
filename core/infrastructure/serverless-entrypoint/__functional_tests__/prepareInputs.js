const fs = require('fs-extra')

module.exports = {
  prepareInputs: function(commands) {
    fs.emptyDirSync(`${__dirname}/inputs`)

    commands.forEach(function(command, index) {
      fs.writeFileSync(
        `${__dirname}/inputs/${index}-${command.name}.json`,
        JSON.stringify(
          {
            resource: '/',
            path: '/',
            httpMethod: 'POST',
            requestContext: {
              authorizer: {
                principalId: command.userId
              }
            },
            body: JSON.stringify({
              command: {
                name: command.name,
                payload: command.payload
              }
            })
          },
          null,
          2
        )
      )
    })
  }
}
