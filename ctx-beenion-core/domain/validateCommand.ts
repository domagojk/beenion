import * as t from 'io-ts'
import { Type } from 'io-ts/lib'

const validateCommand = <T>(command: object, type: Type<T>): T => {
  return t.validate(command, type).fold(
    (err) => {
      throw new TypeError(err[0].value)
    },
    data => data
  )
}

export default validateCommand
