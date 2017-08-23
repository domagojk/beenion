import { URL } from 'domain/UL/types'

const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
const regex = new RegExp(expression)

export default (x): x is URL =>
  typeof x === 'string' &&
  x.match(regex) !== null
