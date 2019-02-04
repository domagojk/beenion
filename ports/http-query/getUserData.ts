import 'source-map-support/register'
import { getUserId } from '../../infrastructure/authentication/getUserId'
import { makeResponse } from '../../infrastructure/http/makeResponse'
import { dynamoDbEventStore } from '../../infrastructure/databases/eventstore/dynamoDbEventStore'
import { userApi } from '../../infrastructure/databases/users/userApi'
import { getUserFollowers } from '../../model/user/reducers/userFollowingArrReducer'

let userIdUsernameCache = {}

async function getUsername(userId) {
  if (userIdUsernameCache[userId]) {
    return userIdUsernameCache[userId]
  } else {
    let username = ''
    try {
      username = await userApi.getUsernameByUserId(userId)
    } catch(err) {
      username = 'unknown'
    }
    
    userIdUsernameCache[userId] = username
    return username
  }
}

export const handler = (event, context, cb) => {
  const userId = getUserId(event)

  if (!userId) {
    return cb(null, makeResponse(401, 'access denied'))
  }

  return dynamoDbEventStore
    .getById(userId, {
      returnEmptyArrOn404: true
    })
    .then(getUserFollowers)
    .then(users => {
      return Promise.all(users.map(userId => getUsername(userId)))
    })
    .then(users => cb(null, makeResponse(200, { following: users })))
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
