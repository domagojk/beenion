import { Title } from 'domain/UL/types'

export default (x): x is Title =>
  typeof x === 'string' &&
  x.length < 100
