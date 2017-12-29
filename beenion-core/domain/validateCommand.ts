import * as t from 'io-ts'

function stringify (v: any): string {
  return typeof v === 'function' ? t.getFunctionName(v) : JSON.stringify(v)
}

function getContextPath (context: t.Context): string {
  return context.map(({ key, type }) => `${key}`).join('.')
}

function getMessage (v: any, context: t.Context): string {
  return `Invalid value ${stringify(v)} supplied to command${getContextPath(context)}`
}

const validateCommand = <T>(command: object, type: t.Type<T>): T => {
  return t.validate(command, type).fold(err => {
    throw err.map(e => getMessage(e.value, e.context))
  }, data => data)
}

export default validateCommand
