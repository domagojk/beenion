import { Event } from '../../model/types'

export type EventStore = {
  getById: (id: string, version?: number) => Promise<Event[]>
  save: (
    params: {
      events: Event[]
      streamId: string
      expectedVersion: number
    }
  ) => Promise<{ id: string }>
}
