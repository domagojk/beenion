import { dynamoDbEventStore } from '../../databases/eventstore/dynamoDbEventStore'
import { linkDetailsProjection } from '../../../ports/eventHandlers/projection-linkdetails/linkDetailsProjection'

async function rebuildES(timestamp) {
  const { getEvent } = await dynamoDbEventStore.getByTimestamp(timestamp)

  const iterate = async () => {
    const event = await getEvent()
    if (event) {
      console.log('invoke for', event.type, event.committedAt)
      await linkDetailsProjection(event)
      iterate()
    }
  }
  iterate()
}

rebuildES(0)
