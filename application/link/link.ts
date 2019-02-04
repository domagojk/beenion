import { getLinkId } from '../../model/getLinkId'
import { EventStore } from '../../infrastructure/databases/eventstore/eventStore'
import { linkReducer } from '../../model/link/reducers/linkReducer'
import { rate } from '../../model/link/command/rate'

export const linkCommandHandlers = (
  eventStore: EventStore,
  userId: string
) => ({
  rate: async (params: {
    linkUrl?: string
    title?: string
    rating?: number
    image?: string
    tags?: string[]
  }) => {
    const linkId = getLinkId(userId, params.linkUrl)
    const linkEvents = await eventStore.getById(linkId, {
      returnEmptyArrOn404: true
    })

    const toCommit = rate({
      link: linkReducer(linkEvents),
      userId,
      linkId,
      linkUrl: params.linkUrl,
      rating: params.rating,
      image: params.image,
      tags: params.tags,
      title: params.title
    })
    
    return eventStore.save({
      events: toCommit,
      streamId: linkId,
      expectedVersion: linkEvents.length
    })
  }
})
