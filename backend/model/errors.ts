export const autorizationError = (data) => {
  let err = new Error('access denied')
  // @ts-ignore
  err.statusCode = 403
  // @ts-ignore
  err.context = data
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

export const validationError = (message: string, context: any) => {
  let err = new Error(message)
  // @ts-ignore
  err.statusCode = 400
  // @ts-ignore
  err.context = context
  return err
}