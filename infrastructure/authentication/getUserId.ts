export function getUserId(event): string {
  let userId
  try {
    userId = JSON.parse(event.requestContext.authorizer.principalId).sub
  } catch (e) {}

  return userId
}
