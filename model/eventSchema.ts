import * as Joi from 'joi'
import { ArticleEvents } from './eventTypes'
import { Event, EventSchema } from './types'

const articleEvents: EventSchema<ArticleEvents> = {
  ARTICLE_CREATED: {
    articleId: Joi.string().required(),
    newsletterId: Joi.string().required(),
    userId: Joi.string().required()
  },
  ARTICLE_DELETED: {
    articleId: Joi.string().required(),
    userId: Joi.string().required()
  },
  ARTICLE_DESCRIPTION_UPDATED: {
    articleId: Joi.string().required(),
    description: Joi.string().required(),
    userId: Joi.string().required()
  },
}

export function validateEvents(events: Event[]) {
  const schema = Joi.array().items(
    Object.keys(articleEvents).map(key =>
      Joi.object({
        type: Joi.string()
          .valid(key)
          .required(),
        timestamp: Joi.date().timestamp('javascript'),
        data: articleEvents[key]
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
