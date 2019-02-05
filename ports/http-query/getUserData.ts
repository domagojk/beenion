import 'source-map-support/register'
import { getUserId } from '../../infrastructure/authentication/getUserId'
import { dynamoDbEventStore } from '../../infrastructure/databases/eventstore/dynamoDbEventStore'
import { userApi } from '../../infrastructure/databases/users/userApi'
import { getUserFollowers } from '../../model/user/reducers/userFollowingArrReducer'
import {
  makeErrorResponse,
  makeSuccessResponse
} from '../../infrastructure/http/makeResponse'

let userIdUsernameCache = {}

async function getUsername(userId) {
  if (userIdUsernameCache[userId]) {
    return userIdUsernameCache[userId]
  } else {
    let username = ''
    try {
      username = await userApi.getUsernameByUserId(userId)
    } catch (err) {
      username = 'unknown'
    }

    userIdUsernameCache[userId] = username
    return username
  }
}

export const handler = (event, context, cb) => {
  const userId = getUserId(event)

  if (!userId) {
    return cb(null, makeErrorResponse(401, 'access denied'))
  }

  return dynamoDbEventStore
    .getById(userId, {
      returnEmptyArrOn404: true
    })
    .then(getUserFollowers)
    .then(users => {
      return Promise.all(users.map(userId => getUsername(userId)))
    })
    .then(users => cb(null, makeSuccessResponse({ following: users })))
    .catch(err => cb(null, makeErrorResponse(err)))
}
