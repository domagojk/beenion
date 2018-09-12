import { Event } from '../../model/eventTypes'

export type GetByIdOptions = {
  version?: number
  returnEmptyArrOn404?: boolean
}

export type EventStore = {
  getById: (id: string, options?: GetByIdOptions) => Promise<Event[]>
  getByIdUsingSnapshot: <T>(
    params: {
      id: string
      reducerId: string
      reducerVersion: string
      reducer: (events: Event[], initialState: any) => T
    }
  ) => Promise<{ state: T; version: number }>
  getByIdAndVersion: (id: string, version: number) => Promise<Event[]>
  getByTimestamp: (timestamp: number) => Promise<Event[]>
  save: (
    params: {
      events: Event[]
      streamId: string
      expectedVersion: number
    }
  ) => Promise<{ id: string }>
}
