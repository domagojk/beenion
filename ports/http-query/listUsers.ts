import 'source-map-support/register'
import { getUserId } from '../../infrastructure/authentication/getUserId'
import { makeResponse } from '../../infrastructure/http/makeResponse'
import { userApi } from '../../infrastructure/databases/users/userApi'

export const handler = (event, context, cb) => {
  const userId = getUserId(event)

  if (!userId) {
    return cb(null, makeResponse(401, 'access denied'))
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
    .then(users => cb(null, makeResponse(200, users)))
    .catch(err => {
      console.error(err)
      cb(
        null,
        makeResponse(err.statusCode || 500, {
          message: err.message,
          errorCode: err.code
        })
      )
    })
}
