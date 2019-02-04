import { linkCommandHandlers } from './link'
import { getLinkId } from '../../model/getLinkId'
import { inMemoryEventStore } from '../../infrastructure/databases/eventstore/inMemoryEventStore'

const link = linkCommandHandlers(inMemoryEventStore, 'test-user')

const timestamp = Date.now()

describe('basic commands', () => {
  beforeAll(() => {
    global['testTimestamp'] = timestamp
  })

  it('should rate link', function() {
    return link
      .rate({
        linkUrl: 'http://test.com',
        rating: 50,
        title: 'test link'
      })
      .then(() =>
        inMemoryEventStore.getById(getLinkId('test-user', 'http://test.com'))
      )
      .then(events => {
        console.log(events)
      })
  })
})
