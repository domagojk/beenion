import { Evaluation } from 'domain/UL/types'

export default (x): x is Evaluation =>
  x === 'accept' ||
  x === 'reject'
