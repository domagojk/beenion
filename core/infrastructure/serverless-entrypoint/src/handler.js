// Public API
module.exports.publicEndpoint = (event, context, cb) => {
  console.log(event)
  cb(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ message: 'public' })
  })
}
// Private API
module.exports.privateEndpoint = (event, context, cb) => {
  console.error(event)
  cb(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ message: 'private' })
  })
}
