export function makeResponse(statusCode: number, message: string | object) {
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
