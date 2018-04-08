import { SingleDocRepo, Event, CommitRes, Document } from './types'

export function makeSingleDocRepo<Doc extends Document>(): SingleDocRepo<Doc> {
  let documents: Record<string, Doc> = {}
  let events: Event<Doc>[] = []

  const commit = (current: CommitRes<Doc>) => (event: Event<Doc>) => {
    const currentDoc = current ? current.doc : documents[event.payload.id]
    const currentlyCommited = current ? current.commited : []

    const res: CommitRes<Doc> = {
      doc: Object.assign({}, currentDoc, event.payload),
      commit: event => {
        return commit(res)(event)
      },
      commited: [...currentlyCommited, event],
      done: () => Promise.resolve(res)
    }

    return Promise.resolve(res)
  }

  const api: SingleDocRepo<Doc> = {
    get(id) {
      if (!documents[id]) {
        throw new Error('document not found')
      }
      return Promise.resolve(documents[id])
    },

    getEventsById(id) {
      return Promise.resolve(events.filter(e => e.payload.id === id))
    },

    create(event) {
      if (documents[event.payload.id]) {
        throw new Error('document already exists')
      }
      documents[event.payload.id] = Object.assign(
        {},
        documents[event.payload.id],
        event.payload
      )
      events = [...events, event]
      return Promise.resolve(documents[event.payload.id])
    },

    save(event) {
      if (!documents[event.payload.id]) {
        throw new Error('document not found')
      }
      documents[event.payload.id] = Object.assign(
        {},
        documents[event.payload.id],
        event.payload
      )
      events = [...events, event]
      return Promise.resolve(documents[event.payload.id])
    },

    delete(event) {
      const doc = documents[event.payload.id]
      if (!doc) {
        throw new Error('document not found')
      }
      delete documents[event.payload.id]
      return Promise.resolve(doc)
    },

    commit: commit(null),

    saveCommited(commitRes: CommitRes<Doc>) {
      events = [...events, ...commitRes.commited]
      documents[commitRes.doc.id] = commitRes.doc

      return Promise.resolve(commitRes.doc)
    }
  }

  return api
}
