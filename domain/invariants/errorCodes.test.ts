import * as errorCodes from './errorCodes'

it ('should have the same constant name and value', () => {
  Object.keys(errorCodes).forEach(errorCode => {
    expect(errorCode).toBe(errorCodes[errorCode])
  })
})
