import * as t from '../../types'
import { privileges } from '../../privileges'
import errors from '../../errors'

export function defineNewsletterPrivilege (
  user: t.User,
  newsletter: t.Newsletter,
  privilege: t.NewsletterPrivilege,
  permission: t.NewsletterPermission,
  timestamp: t.Timestamp
): t.NewsletterEvent[] {

  if (!privileges.canUpdatePrivilege(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterPrivilegeDefined',
      payload: {
        newsletterId: newsletter.newsletterId,
        privilege,
        permission,
        timestamp
      }
    }
  ]
}
