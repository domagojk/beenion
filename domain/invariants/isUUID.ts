import { UUID } from 'domain/UL/types'

// TODO: check length, A-Z 0-9 -
export default (x): x is UUID =>
  typeof x === 'string'
