import 'source-map-support/register'
import { getUserId } from '../../infrastructure/authentication/getUserId'
import stream from 'getstream'
import md5 from 'md5'
import { userApi } from '../../infrastructure/databases/users/userApi'
import {
  makeErrorResponse,
  makeSuccessResponse
} from '../../infrastructure/http/makeResponse'

const getStreamClient = stream.connect(
  process.env.GETSTREAM_KEY,
  process.env.GETSTREAM_SECRET,
  process.env.GETSTREAM_APPID
)

let userIdUsernameCache = {}

async function getUsername(userId) {
  if (!userId) {
    return ''
  } else if (userIdUsernameCache[userId]) {
    return userIdUsernameCache[userId]
  } else {
    userIdUsernameCache = await userApi.listAllUsers()
    return userIdUsernameCache[userId]
  }
}

export const handler = (event, context, cb) => {
  const userId = getUserId(event)

  if (!userId) {
    return cb(null, makeErrorResponse(401, 'access denied'))
  }

  const timeline = getStreamClient.feed('timeline', md5(userId))

  return timeline
    .get({ limit: 1, offset: 0 })
    .then((res: any) => {
      return {
        links: res.results.map(result => ({
          ...JSON.parse(result.object),
          time: result.time
        })),
        next: res.next
      }
    })
    .then(res => {
      return Promise.all(res.links.map(link => getUsername(link.userId))).then(
        usernames => {
          return {
            links: res.links.map((link, index) => ({
              ...link,
              username: usernames[index]
            })),
            next: !!res.next
          }
        }
      )
    })
    .then(res => cb(null, makeSuccessResponse(res)))
    .catch(err => cb(null, makeErrorResponse(err)))
}
