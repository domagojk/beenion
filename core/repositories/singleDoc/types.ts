import { User } from '../../model/user/types'

export type Document = {
  id: string
  version: number
  [key: string]: any
}
export type SingleDocRepo<Doc extends Document> = {
  get: (id: string) => Promise<Doc>
  getEventsById: (id: string) => Promise<Event<Doc>[]>
  create: (params: Event<Doc>) => Promise<Doc>
  save: (params: Event<Doc>) => Promise<Doc>
  delete: (params: Event<Doc>) => Promise<Doc>
  commit: (params: Event<Doc>, current?: CommitRes<Doc>) => Promise<CommitRes<Doc>>
  saveCommited: (params: CommitRes<Doc>) => Promise<Doc>
}

export type DocParams<Doc extends Document> = Partial<Doc> & { id: string }

export type Event<Doc extends Document> = {
  from: User | 'internal'
  payload: DocParams<Doc>
  type: string
}

export type CommitRes<Doc extends Document> = {
  doc: Doc
  done: () => Promise<CommitRes<Doc>>
  commit: SingleDocRepo<Doc>['commit']
  commited: Event<Doc>[]
}
