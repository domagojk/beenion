import { Event } from '../../model/eventTypes'

export type GetByIdOptions = {
  version?: number
  emptyArrOn404?: boolean
}

export type EventStore = {
  getById: (id: string, options?: GetByIdOptions) => Promise<Event[]>
  getByTimestamp: (timestamp: number) => Promise<Event[]>
  save: (
    params: {
      events: Event[]
      streamId: string
      expectedVersion: number
    }
  ) => Promise<{ id: string }>
}
