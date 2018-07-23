import { inMemoryEventStore as eventStore } from '../adapters/eventstore/inMemoryEventStore'
import { linkCommandHandlers } from '../commandHandlers/link'
import { getLinkId } from '../model/getLinkId'

const user = {
  userId: 'test-user'
}

const link = linkCommandHandlers(eventStore, user)

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
      .then(() => eventStore.getById(getLinkId(user, 'http://test.com')))
      .then(events => {
        console.log(events)
      })
  })
})
