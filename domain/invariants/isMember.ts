import { Member } from 'domain/UL/types'
import isUUID from './isUUID'
import isUsername from './isUsername'

export default (x: Member): x is Member =>
  typeof x === 'object' &&
  typeof x.publicationRank === 'number' &&
  isUUID(x.userId) &&
  isUsername(x.username)
