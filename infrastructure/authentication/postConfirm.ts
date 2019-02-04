import { dynamoDbEventStore } from '../databases/eventstore/dynamoDbEventStore'
import { userCommandHandlers } from '../../application/user/user'

export const handler = (event, context, cb) => {
  userCommandHandlers(dynamoDbEventStore, event.request.userAttributes.sub)
    .follow({
      username: event.userName
    })
    .then(() => cb(null, event))
    .catch(err => {
      console.log(err)
      cb(null, event)
    })
}
