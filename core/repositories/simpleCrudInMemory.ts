const documents = {}

// _version in every doc

export const simpleCrud = {
  get (id) {
    if (!documents[id]) {
      throw new Error('document not found')
    }
    return Promise.resolve(documents[id])
  },

  save (id, doc) {
    if (doc[id]) {
      throw new Error('document already exists')
    }
    documents[id] = doc
    return Promise.resolve(documents[id])
  },

  update (id, doc) {
    if (!doc[id]) {
      throw new Error('document not found')
    }
    documents[id] = doc
    return Promise.resolve(documents[id])
  },

  delete (id) {
    const doc = documents[id]
    if (!doc) {
      throw new Error('document not found')
    }
    delete documents[id]
    return Promise.resolve(doc)
  }
}