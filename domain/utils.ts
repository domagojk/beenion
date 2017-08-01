/**
 * calcState is used for calcuating state (projection)
 * as a left fold on history of previous events
 */
export function calcState (eventHandlers, history, initialState = {}) {
  return history.reduce((s, e) => {
    if (typeof eventHandlers[e.type] === 'function') {
      return eventHandlers[e.type](s, e)
    }
  }, initialState)
}
