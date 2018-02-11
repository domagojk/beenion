const AWS = require('aws-sdk')
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()

module.exports.handler = (event, context) => {
  console.log('User confirmed: User-Pool', event)

  const params = {
    UserAttributes: [
      {
        Name: 'custom:beenionId',
        Value: 'value'
      }
    ],
    UserPoolId: event.userPoolId,
    Username: event.userName
  }
  console.log(1)
  cognitoidentityserviceprovider.adminUpdateUserAttributes(params, function(
    err,
    data
  ) {
    if (err)
      console.log(2, err, err.stack) // an error occurred
    else console.log(3, data) // successful response

    context.done(null, event)
  })
}
