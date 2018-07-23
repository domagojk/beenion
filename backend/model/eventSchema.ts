import * as Joi from 'joi'
import { Event, Events } from './eventTypes'

type EventSchema<Events> = {
  [Event in keyof Events]: { [Prop in keyof Events[Event]]: Joi.AnySchema }
}

const eventSchema: EventSchema<Events> = {
  LINK_CREATED: {
    linkUrl: Joi.string().required(),
    linkId: Joi.string().required(),
    userId: Joi.string().required()
  },
  LINK_RATED: {
    userId: Joi.string().required(),
    linkId: Joi.string().required(),
    rating: Joi.number().required()
  },
  LINK_TAG_ADDED: {
    userId: Joi.string().required(),
    linkId: Joi.string().required(),
    tag: Joi.string().required()
  },
  LINK_TAG_REMOVED: {
    userId: Joi.string().required(),
    linkId: Joi.string().required(),
    tag: Joi.string().required()
  },
  LINK_TITLE_UPDATED: {
    userId: Joi.string().required(),
    linkId: Joi.string().required(),
    title: Joi.string().required()
  },
  LINK_IMAGE_UPDATED: {
    userId: Joi.string().required(),
    linkId: Joi.string().required(),
    image: Joi.string().required()
  },
  USER_FOLLOWED: {
    userId: Joi.string().required(),
    followedUserId: Joi.string().required()
  },
  USER_UNFOLLOWED: {
    userId: Joi.string().required(),
    unfollowedUserId: Joi.string().required()
  },
  USER_TAG_FILTER_DEFINED: {
    userId: Joi.string().required(),
    tags: Joi.string().required()
  },
  USER_RATING_FILTER_DEFINED: {
    userId: Joi.string().required(),
    followedUserId: Joi.string().required(),
    followedUserRating: Joi.number().required()
  }
}

export function validateEvents(events: Event[]) {
  const schema = Joi.array().items(
    Object.keys(eventSchema).map(key =>
      Joi.object({
        type: Joi.string()
          .valid(key)
          .required(),
        timestamp: Joi.date().timestamp('javascript'),
        payload: eventSchema[key]
      })
    )
  )

  const validationResult = Joi.validate(events, schema)

  if (validationResult.error !== null) {
    const message =
      validationResult.error.details && validationResult.error.details.length
        ? validationResult.error.details[0].message
        : validationResult.error.message

    return {
      value: validationResult.value,
      message
    }
  }
}
