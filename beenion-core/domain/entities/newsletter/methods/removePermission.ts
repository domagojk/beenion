import * as t from '../../../types'
import privileges from '../../../privileges'
import errors from '../../../errors'

export function removePermission (params: {
  user: t.User
  newsletter: t.Newsletter
  privilege: t.NewsletterPrivilege
  timestamp: t.Timestamp
}): t.NewsletterEvent[] {
  const { user, newsletter, privilege, timestamp } = params

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
