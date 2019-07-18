import { dynamoDbEventStore } from '../../databases/eventstore/dynamoDbEventStore'
// import { linkDetailsProjection } from '../../../ports/eventHandlers/projection-linkdetails/linkDetailsProjection'

async function rebuild(timestamp) {
  const firstQuery = await dynamoDbEventStore.getByTimestamp(timestamp)

  const iterate = (getEvent: typeof firstQuery.getEvent) => async (
    eventIndex = 0,
    commitIndex = 0
  ) => {
    const res = await getEvent(eventIndex, commitIndex)
    if (res && res.event) {
      console.log('invoke for', res.event.type, res.event.timestamp)
      // await linkDetailsProjection(res.event)

      iterate(getEvent)(res.nextEventIndex, res.nextCommitIndex)
    } else if (res && res.lastEvaluatedKey) {
      console.log('new query from ' + res.lastEvaluatedKey)
      const newQuery = await dynamoDbEventStore.getByTimestamp(
        timestamp,
        res.lastEvaluatedKey
      )
      iterate(newQuery.getEvent)(0, 0)
    }
  }

  iterate(firstQuery.getEvent)(0, 0)
}

rebuild(0)
