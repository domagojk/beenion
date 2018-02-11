const { exec } = require('child_process')
const { prepareInputs } = require('./prepareInputs')
const config = require('./config')

prepareInputs(config.commands)
config.commands.forEach((command, index) => {
  const shouldOrNot = command.shouldFail ? 'should not' : 'should'

  it(`${shouldOrNot} accept ${command.name}`, function (done) {
    this.timeout(25000)
    console.log(`invoking ${command.name} command`)
  
    exec(
      `${config.cmd} -f command --path ${__dirname}/inputs/${index}-${command.name}.json`,
      (error, stdout, stderr) => {
        let accepted = false

        if (
          typeof stdout === 'string' && 
          stdout.substr(-50).indexOf('command accepted') !== -1
        ) {
          accepted = true
        }

        if (accepted && !command.shouldFail) {
          done()
        } else {
          console.log(stdout)
          console.log(stderr)
          done('error')
        }
      }
    )
  })
})
