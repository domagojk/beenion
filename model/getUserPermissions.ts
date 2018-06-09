import { UserData, PermissionSettings, PermissionType } from './types'

const defaultPermissions: Record<PermissionType, boolean> = {
  createArticle: false,
  deleteArticle: false,
  deleteNewsletter: false,
  updateNewsletterMetadata: false,
  updateNewsletterPermissions: false,
  updateNewsletterSettings: false
}

export function getUserPermissions(params: {
  user: UserData
  resourceId: string
  resourceOwner: string
  newsletterPermissions: PermissionSettings
}) {
  const user = params.user

  const permissionSettings = params.newsletterPermissions[params.resourceId]
    ? params.newsletterPermissions[params.resourceId]
    : params.newsletterPermissions['default']

  const permissions: Record<PermissionType, boolean> = Object.keys(defaultPermissions).reduce(
    (acc, currAction) => {
      for (const permSettings of permissionSettings[currAction]) {
        // is user owner
        if (permSettings.owner && params.resourceOwner === user.userId) {
          return {
            ...acc,
            [currAction]: true
          }
        }
        // is user in allowed users array
        if (permSettings.users.includes(user.userId)) {
          return {
            ...acc,
            [currAction]: true
          }
        }
        // is user group on allowed groups array
        for (const userGroup of user.userGroups) {
          if (permSettings.groups.includes(userGroup)) {
            return {
              ...acc,
              [currAction]: true
            }
          }
        }
      }

      return {
        ...acc,
        [currAction]: false
      }
    },
    defaultPermissions
  )

  return {
    ...permissions,
    context: {
      user: params.user,
      resourceId: params.resourceId,
      resourceOwner: params.resourceOwner
    }
  }

}
