import { UserData } from "../../../model/userdata";

export function getUserData(event): UserData {
  let userData
  try {
    userData = JSON.parse(event.requestContext.authorizer.principalId)
  } catch (e) {
    console.error(e)
    console.log('event:', event)
  }

  return userData
}