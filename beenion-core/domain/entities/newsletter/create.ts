import * as t from '../../types'
import privileges from '../../privileges'
import errors from '../../errors'

export function createNewsletter (
  user: t.User,
  newsletterId: t.NewsletterId,
  title: t.Title,
  description: t.Description,
  timestamp: t.Timestamp
): t.NewsletterEvent[] {

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
