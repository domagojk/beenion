import { Timestamp } from 'domain/UL/types'

export default (x): x is Timestamp =>
  typeof x === 'number' &&
  x > 1483228800000 && // not before 01/01/2017
  x < 4102444800000 // not after 01/01/2100
