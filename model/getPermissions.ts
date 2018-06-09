import { PermissionSettings, Event } from './types'

const getDefaultPermissions = (
  newsletterId: string
): PermissionSettings => ({
  default: {
    createArticle: [
      { newsletterId, groups: ['admin', 'member'], users: [], owner: true }
    ],
    deleteArticle: [
      { newsletterId, groups: ['admin'], users: [], owner: true }
    ],
    updateNewsletterMetadata: [
      { newsletterId, groups: ['admin'], users: [], owner: true }
    ],
    updateNewsletterPermissions: [
      { newsletterId, groups: ['admin'], users: [], owner: true }
    ],
    deleteNewsletter: [
      { newsletterId, groups: ['admin'], users: [], owner: true }
    ],
    updateNewsletterSettings: [
      { newsletterId, groups: ['admin'], users: [], owner: true }
    ],
  }
})

export function getPermissions(newsletterEvents: Event[]) {
  const nesletter = newsletterEvents.reduce(
    (acc, curr) => {
      switch (curr.type) {
        case 'NEWSLETTER_CREATED':
          return {
            ...acc,
            newsletterId: curr.data.newsletterId
          }
        // todo: permissions updated
      }
    },
    {
      newsletterId: null
    }
  )

  return getDefaultPermissions(nesletter.orgId)
}
