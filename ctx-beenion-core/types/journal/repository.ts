import { Journal, JournalEvent, JournalId } from '../index'

export type JournalRepository = {
  getById: (id: JournalId) => Promise<Journal>
  save: (params: {
    events: JournalEvent[],
    id: JournalId,
    expectedVersion: number
  }) => Promise<any>
}
