import 'source-map-support/register'
import { getUserId } from '../../infrastructure/authentication/getUserId'
import { makeResponse } from '../../infrastructure/http/makeResponse'
import stream from 'getstream'
import md5 from 'md5'
import { userApi } from '../../infrastructure/databases/users/userApi'

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

export const handler = async (event, context, cb) => {
  const userId = getUserId(event)

  if (!userId) {
    return cb(null, makeResponse(401, 'access denied'))
  }

  const getFeed = async () => {
    if (event.queryStringParameters.user) {
      const showUserId = await userApi.getUserIdByUsername(
        event.queryStringParameters.user
      )
      return getStreamClient.feed('user', md5(showUserId))
    }
    return event.queryStringParameters.tag
      ? getStreamClient.feed('tag', event.queryStringParameters.tag)
      : getStreamClient.feed('timeline', md5(userId))
  }

  const feed = await getFeed()

  const offset = event.queryStringParameters.offset || 0
  return feed
    .get({ limit: 10, offset })
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
    .then(data => cb(null, makeResponse(200, data)))
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
