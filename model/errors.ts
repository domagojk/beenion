export const autorizationError = (data) => {
  let err = new Error(data.message)
  // @ts-ignore
  err.statusCode = 403
  return err
}

export const notFoundError = (data) => {
  let err = new Error(data.message)
  // @ts-ignore
  err.statusCode = 404
  return err
}

export const conflictError = (data) => {
  let err = new Error(data.message)
  // @ts-ignore
  err.statusCode = 409
  return err
}

export const inputValidationError = (data) => {
  let err = new Error(data.message)
  // @ts-ignore
  err.statusCode = 400
  return err
}
