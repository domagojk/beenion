import { dynamoDbEventStore as eventStore } from '../adapters/eventstore/aws/dynamoDbEventStore'

eventStore.save({
  events: [
    {
      type: 'USER_FOLLOWED',
      payload: {
        userId: '5testUser1',
        followedUserId: '5testUser2'
      }
    }
  ],
  streamId: '5testUser1',
  expectedVersion: 0
})
