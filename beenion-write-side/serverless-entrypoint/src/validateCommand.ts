import * as t from 'io-ts'

function stringify (v: any): string {
  return typeof v === 'function' ? t.getFunctionName(v) : JSON.stringify(v)
}

function getContextPath (context: t.Context): string {
  return context.map(({ key }) => `${key}`).join('.')
}

function getMessage (v: any, context: t.Context): string {
  return `Invalid value ${stringify(v)} supplied to command${getContextPath(context)}`
}

export const validateCommand = (command, type) => {
  return t.validate(command, type).fold(err => {
    return err.map(e => getMessage(e.value, e.context))
  }, () => [])
}
