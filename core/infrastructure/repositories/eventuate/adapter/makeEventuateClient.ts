import * as EventuateClient from '@eventuateinc/eventuate-nodejs-client'

const { EventuateClientConfiguration } = EventuateClient
const eventuateClientOpts = new EventuateClientConfiguration({ debug: true })
const eventuateClient = new EventuateClient(eventuateClientOpts)

export const makeEventuateClient = entityName => ({
  loadEvents: entityId =>
    eventuateClient.loadEvents(entityName, entityId).then(loadedEvents => {
      if (loadedEvents.length === 0) {
        throw new Error(`${entityName} not found`)
      }

      return loadedEvents.map(e => ({
        _eventuateId: e.id,
        type: e.eventType,
        payload: e.eventData
      }))
    }),
  create: (entityId, events) => {
    const eventuateEvents = events.map(e => ({
      eventType: e.type,
      eventData: e.payload
    }))

    return eventuateClient.create(entityName, eventuateEvents, { entityId })
  },
  save: (entityId, history, events) => {
    const eventuateEvents = events.map(e => ({
      eventType: e.type,
      eventData: e.payload
    }))

    const lastEvent = history[history.length - 1]

    return eventuateClient.update(
      entityName,
      entityId,
      lastEvent._eventuateId,
      eventuateEvents
    )
  }
})
