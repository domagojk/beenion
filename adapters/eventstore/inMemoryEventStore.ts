import { EventStore } from './types'
import { Event } from '../../model/types'
import { validateEvents } from '../../model/eventSchema'

let streams = {}

export const inMemoryEventStore: EventStore = {
  getById: (id: string) =>
    new Promise((resolve, reject) => {
      if (streams[id]) {
        resolve(streams[id])
      } else {
        reject(`stream with id ${id} not found`)
      }
    }),

  save: (params: {
    events: Event[]
    streamId: string
    expectedVersion: number
  }) =>
    new Promise((resolve, reject) => {
      const timestamp =
        process.env.NODE_ENV === 'test' && global['testTimestamp']
          ? global['testTimestamp']
          : Date.now()

      const eventsWithTimestamp = params.events.map(e => ({
        ...e,
        timestamp: e.timestamp || timestamp
      }))

      const error = validateEvents(eventsWithTimestamp)
      if (error) {
        return reject(error)
      }

      if (!streams[params.streamId]) {
        streams[params.streamId] = []
      }

      if (streams[params.streamId].length !== params.expectedVersion) {
        return reject(`cuncurency exception on stream ${params.streamId}`)
      }

      streams[params.streamId] = [
        ...streams[params.streamId],
        ...eventsWithTimestamp
      ]

      resolve({
        id: params.streamId
      })
    })
}
