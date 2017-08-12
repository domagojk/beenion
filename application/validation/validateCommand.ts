function validateCommand (command, types) {
  for (let [prop, value] of command) {
    if (!types[prop]) {
      throw new Error(`No type validation found for "${prop}" property.`)
    }
    if (!types[prop](value)) {
      throw new Error(`Type validation failed on "${prop}" property.`)
    }
  }
}
export default validateCommand
