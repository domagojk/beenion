import * as Joi from 'joi'
import { UserData } from '../model/userdata'
import { EventStore } from '../adapters/eventstore/eventStore'
import { inputValidationError } from '../model/errors'
import { rateLink } from '../model/link/rateLink'
import { createLink } from '../model/link/createLink'
import { updateLinkTitle } from '../model/link/updateLinkTitle'
import { updateLinkImage } from '../model/link/updateLinkImage'
import { tagLink } from '../model/link/tagLink'
import { linkProjection } from '../model/projections/linkProjection'
import { getLinkId } from '../model/getLinkId'

type RateLink = {
  linkUrl?: string
  title?: string
  rating?: number
  image?: string
  tags?: string[]
}

export const linkCommandHandlers = (
  eventStore: EventStore,
  user: UserData
) => ({
  rate: async (params: RateLink) => {
    const {
      value: { linkUrl, title, rating, image, tags },
      error
    } = Joi.validate(
      params,
      Joi.object({
        linkUrl: Joi.string(),
        title: Joi.string(),
        rating: Joi.number(),
        image: Joi.string(),
        tags: Joi.array().items(Joi.string())
      })
    )

    if (error) {
      throw inputValidationError(error)
    }

    const linkId = getLinkId(user, params.linkUrl)
    const linkEvents = await eventStore.getById(linkId, { emptyArrOn404: true })
    const link = linkProjection(linkEvents)

    return eventStore.save({
      events: [
        ...(!linkEvents.length ? createLink({ linkId, linkUrl, user }) : []),
        ...(title ? updateLinkTitle({ linkId, user, title }) : []),
        ...(rating ? rateLink({ linkId, rating, user }) : []),
        ...(image ? updateLinkImage({ linkId, user, image }) : []),
        ...(tags ? tagLink({ linkId, user, tags, link }) : [])
      ],
      streamId: linkId,
      expectedVersion: linkEvents.length
    })
  }
})
