function makeAggregate(commandHandlers, eventHandlers) {
  class AggregateRoot {
    private state
    private _changes = []

    constructor(...params) {
      Object.keys(commandHandlers).forEach(c => {
        if (typeof commandHandlers[c]() !== 'function') {
          throw new Error(
            `command handler "${c}" must be a factory function: state => command => events`
          )
        }
        if (c === 'create') {
          commandHandlers.create(this.state)(...params)
        } else {
          this[c] = (...params) => commandHandlers[c](this.state)(...params)
        }
      })
    }

    public getUncommittedChanges() {
      return this._changes
    }

    public replay(history) {
      history.forEach(e => this.applyChange(e, false))
    }

    private applyChange(event, isNew) {
      if (!eventHandlers[event.type]) {
        throw new Error(`Missing event handler for ${event.type} event.`)
      }
      this.state = eventHandlers[event.type](this.state, event)
      if (isNew) {
        this._changes.push(event)
      }
    }
  }

  return AggregateRoot as any
}

export default makeAggregate
