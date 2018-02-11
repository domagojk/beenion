exports.handler = function(event, context) {

  console.log(event)

  if (!event.request.userAttributes['custom:beenionId']) {
    const error = new Error('Sign-in error. Please contact support.')
    return context.done(error, event)
  }

  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        beenionId: event.request.userAttributes['custom:beenionId']
      }
    }
  }

  context.done(null, event)
}
