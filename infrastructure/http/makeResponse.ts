import { DomainError } from '../../model/DomainError'

function makeResponse(statusCode: number, message: string | object) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body:
      typeof message === 'object'
        ? JSON.stringify(message)
        : JSON.stringify({
            message
          })
  }
}

export function makeSuccessResponse(message: any) {
  return makeResponse(200, message)
}

export function makeErrorResponse(err: any, message?: any) {
  let statusCode = 500

  if (err instanceof Error) {
    message = err.message
    if (err instanceof DomainError) {
      statusCode = 400
    }
    if (err['statusCode']) {
      statusCode = err['statusCode']
    }
    console.log(err)
  } else if (typeof err === 'number') {
    statusCode = err
  }

  return makeResponse(statusCode, message)
}
