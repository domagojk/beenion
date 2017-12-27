import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function create (params: {
  user: t.User
  newsletterId: t.newsletterId
  title: t.Title
  description: t.Description
  timestamp: t.Timestamp
}): t.NewsletterEvent[] {
  const { user, newsletterId, title, description, timestamp } = params

  if (!privileges.canCreateNewsletter(user)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterCreated',
      payload: {
        newsletterId,
        ownerId: user.userId,
        timestamp
      }
    },
    {
      type: 'NewsletterTitleDefined',
      payload: {
        newsletterId,
        title,
        timestamp
      }
    },
    {
      type: 'NewsletterDescriptionDefined',
      payload: {
        newsletterId,
        description,
        timestamp
      }
    },
    {
      type: 'NewsletterPrivilegeDefined',
      payload: {
        newsletterId,
        privilege: 'canUpdateNewsletter',
        permission: {
          users: [user.userId]
        },
        timestamp
      }
    }
  ]
}
