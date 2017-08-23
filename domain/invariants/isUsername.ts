import { Username } from 'domain/UL/types'

// TODO: check for spaces, length, special chars
export default (x): x is Username =>
  typeof x === 'string'
