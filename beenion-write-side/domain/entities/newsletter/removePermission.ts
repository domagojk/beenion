import * as t from '../../types'
import { privileges } from '../../privileges'
import errors from '../../errors'

export function removeNewsletterPermission (
  user: t.User,
  newsletter: t.Newsletter,
  privilege: t.NewsletterPrivilege,
  timestamp: t.Timestamp
): t.NewsletterEvent[] {

  if (!privileges.canUpdatePrivilege(user, newsletter)) {
    throw errors.permisionDenied()
  }

  return [
    {
      type: 'NewsletterPrivilegeRemoved',
      payload: {
        newsletterId: newsletter.newsletterId,
        privilege,
        timestamp
      }
    }
  ]
}
