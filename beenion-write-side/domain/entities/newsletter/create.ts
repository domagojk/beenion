import * as t from '../../types'
import { privileges } from '../../privileges'
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

  const adminPrvileges: t.NewsletterPrivilege[] = [
    'canUpdateNewsletter',
    'canUpdatePrivilege',
    'canUpdateRankCalcParams',
    'canUpdateStageRules',
    'canUpdateEditor',
    'canDeleteNewsletter',
    'canCreateArticle',
    'canDeleteArticle',
    'canBanArticle',
    'canUpdateArticle'
  ]

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
    ...adminPrvileges.map(privilege => ({
      type: 'NewsletterPrivilegeDefined' as 'NewsletterPrivilegeDefined', // wat?
      payload: {
        newsletterId,
        privilege: privilege as t.NewsletterPrivilege, // wat?
        permission: {
          users: [user.userId]
        },
        timestamp
      }
    }))
  ]
}
