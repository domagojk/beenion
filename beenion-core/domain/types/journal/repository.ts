import { Journal, JournalEvent, JournalId } from '../index'

export type JournalRepository = {
  getById: (id: JournalId) => Promise<{
    journalState: Journal,
    save: (events: JournalEvent[], version?: number) => Promise<any>
  }>
}
