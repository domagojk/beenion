import * as t from 'io-ts'
import { Type } from 'io-ts/lib'
import { failure } from 'io-ts/lib/PathReporter'

const validateCommand = <T>(command: object, type: Type<T>): T => {
  return t.validate(command, type).fold(
    (err) => {
      const errors = failure(err)
      // throwing only first error
      throw errors[0]
    },
    data => data
  )
}

export default validateCommand
