import 'source-map-support/register'
import { getUserId } from '../../infrastructure/authentication/getUserId'
import { userApi } from '../../infrastructure/databases/users/userApi'
import { makeErrorResponse, makeSuccessResponse } from '../../infrastructure/http/makeResponse'

export const handler = (event, context, cb) => {
  const userId = getUserId(event)

  if (!userId) {
    return cb(null, makeErrorResponse(401, 'access denied'))
  }

  return userApi
    .listUsers({ limit: null })
    .then(users => {
      return users
        .filter(
          user =>
            user.Enabled &&
            user.Attributes.filter(({ Name }) => Name === 'sub')[0].Value !==
              userId
        )
        .map(user => user.Username)
    })
    .then(res => cb(null, makeSuccessResponse(res)))
    .catch(err => cb(null, makeErrorResponse(err)))
}
