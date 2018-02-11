const db = {
  getById: (id) => id,
  save: (events, version) => new Promise((resolve, reject) => {
    resolve()
  })
}

const repo = async ({ id, projections }) => {
  const history = await db.getById(id)
  let committed = []
  let reduced = {}
  Object.keys(projections).forEach(key => {
    reduced[key] = history.reduce(projections[key], {})
  })

  return {
    validate: cb => {
      return new Promise((resolve, reject) => {
        let failed
        try {
          cb(reduced)
        } catch (err) {
          failed = err
        }

        if (failed) {
          reject(failed)
        } else {
          resolve()
        }
      })
    },
    commit: cb => {
      return new Promise((resolve, reject) => {
        const res = cb(reduced)
        // update result
        committed.push(res)
        resolve()
      })
    },
    commitIfValid: (checkFn, ...eventFn) => {
      if (checkFn(reduced)) {
        eventFn.forEach(cb => {
          const res = cb(reduced)
          // update result
          committed.push(res)
        })
      }
    },
    save: () => db.save(committed, history.length)
  }
}
