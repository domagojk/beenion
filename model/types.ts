import { ArticleEvent } from './eventTypes'

export type UserData = {
  userId: string
  userGroups: string[]
  email: string
}

export type UserAndGroups = {
  newsletterId: string
  groups: string[]
  users: string[]
  owner: boolean
}

export type PermissionSettings = {
  // docId: Permissions
  [key: string]: Record<PermissionType, UserAndGroups[]>
}

export type PermissionType =
  | 'createArticle'
  | 'deleteArticle'
  | 'updateNewsletterMetadata'
  | 'updateNewsletterPermissions'
  | 'updateNewsletterSettings'
  | 'deleteNewsletter'

export type Event = ArticleEvent /* | NewsletterEvent | ... */

// generic types
export type ObjectToUnion<Obj extends object> = Obj[keyof Obj]
export type EventUnion<Events> = ObjectToUnion<
  {
    [P in keyof Events]: {
      type: P
      timestamp?: number
      data: Events[P]
    }
  }
>

export type EventSchema<Events> = {
  [Event in keyof Events]: { [Prop in keyof Events[Event]]: any }
}
