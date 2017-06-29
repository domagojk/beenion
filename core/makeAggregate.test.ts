it('should contain basic methods', () => {
  const makeAggregate = require('./makeAggregate').default
  const AggregateRoot = makeAggregate({}, {})
  const aggregate = new AggregateRoot()
  expect(aggregate.getUncommittedChanges).toBeDefined()
  expect(aggregate.replay).toBeDefined()
})

it('should extend with command handlers methods', () => {
  const makeAggregate = require('./makeAggregate').default
  const AggregateRoot = makeAggregate({
    test: param => param
  })
  const aggregate = new AggregateRoot()
  expect(aggregate.test(2)).toBe(2)
})
