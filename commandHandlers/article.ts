import { UserData } from '../model/types'
import { autorizationError } from '../model/errors'
import { getUserPermissions } from '../model/getUserPermissions'
import { generalProjection } from '../model/generalProjection'
import { EventStore } from '../adapters/eventstore/types'
import { getPermissions } from '../model/getPermissions'

export const articleCommandHandlers = (
  eventStore: EventStore,
  user: UserData
) => ({
  create: async (params: { articleId: string; newsletterId: string }) => {
    const newsletterEvents = await eventStore.getById(params.newsletterId)
    const newsletter = generalProjection(newsletterEvents)

    const userPermissions = getUserPermissions({
      user,
      resourceId: params.newsletterId,
      resourceOwner: newsletter.owner,
      newsletterPermissions: getPermissions(newsletterEvents)
    })

    if (userPermissions.createArticle === false) {
      throw autorizationError(userPermissions.context)
    }

    return eventStore.save({
      events: [
        {
          type: 'ARTICLE_CREATED',
          data: {
            articleId: params.articleId,
            newsletterId: params.newsletterId,
            userId: user.userId
          }
        }
      ],
      streamId: params.articleId,
      expectedVersion: 0
    })
  }
})
