import { EventStore, GetByIdOptions } from './eventStore'
import { validateEvents } from '../../model/eventSchema'
import { Event } from '../../model/eventTypes'

let streams = {}
let allEvents = []

export const inMemoryEventStore: EventStore = {
  getById: (id: string, options: GetByIdOptions = {}) =>
    new Promise((resolve, reject) => {
      if (streams[id]) {
        resolve(streams[id])
      } else {
        if (options.returnEmptyArrOn404) {
          return resolve([])
        }
        reject({
          statusCode: 404,
          message: `stream with id ${id} not found`
        })
      }
    }),

  getByIdUsingSnapshot: async ({ id, reducer }) => {
    const events = await inMemoryEventStore.getById(id)
    return {
      state: reducer(events, null),
      version: events.length
    }
  },

  getByIdAndVersion: (id: string, version: number) =>
    new Promise((resolve, reject) => {
      if (streams[id]) {
        resolve(streams[id])
      } else {
        reject({
          statusCode: 404,
          message: `stream with id ${id} not found`
        })
      }
    }),

  getByTimestamp: (timestamp: number) =>
    new Promise((resolve, reject) => {
      resolve(allEvents.filter(e => e.timestamp > timestamp))
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

      const eventsWithTimestamp = params.events.filter(e => !!e).map(e => ({
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

      allEvents = [...allEvents, ...eventsWithTimestamp]

      resolve({
        id: params.streamId
      })
    })
}