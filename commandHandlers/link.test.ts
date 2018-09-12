import { linkCommandHandlers } from './link'
import { getLinkId } from '../model/getLinkId'
import { inMemoryEventStore } from '../databases/eventstore/inMemoryEventStore'

const user = {
  userId: 'test-user'
}

const link = linkCommandHandlers(inMemoryEventStore, user)

const timestamp = Date.now()

describe('basic commands', () => {
  beforeAll(() => {
    global['testTimestamp'] = timestamp
  })

  it('should', function() {
    return link
      .rate({
        linkUrl: 'http://test.com',
        rating: 50,
        title: 'test link'
      })
      .then(() =>
        inMemoryEventStore.getById(getLinkId(user, 'http://test.com'))
      )
      .then(events => {
        console.log(events)
      })
  })
})
