import { Description } from 'domain/UL/types'

export default (x): x is Description =>
  typeof x === 'string'
