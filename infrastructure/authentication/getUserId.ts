export function getUserId(event): string {
  return event.requestContext.authorizer.claims.sub
}
