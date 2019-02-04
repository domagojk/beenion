/**
 * every event has a following structure:
 * 
 *  {
 *    type: string
 *    timestamp: number
 *    payload: object
 *  }
 * 
 *  That type is created using
 *  "Events" which is passed in "CreateEventUnion" type
 */
export type Event = CreateEventUnion<Events>

export type Events = {
  LINK_CREATED: {
    userId: string
    linkId: string
    linkUrl: string
  }
  LINK_RATED: {
    userId: string
    linkId: string
    linkUrl: string
    rating: number
  }
  LINK_TAGGED: {
    userId: string
    linkId: string
    linkUrl: string
    tags: string[]
  }
  LINK_TITLE_UPDATED: {
    userId: string
    linkId: string
    linkUrl: string
    title: string
  }
  LINK_IMAGE_UPDATED: {
    userId: string
    linkId: string
    linkUrl: string
    image: string
  }
  USER_FOLLOWED: {
    userId: string
    followedUserId: string
  }
  USER_UNFOLLOWED: {
    userId: string
    unfollowedUserId: string
  }
}

type ConvertObjectToUnion<Obj extends object> = Obj[keyof Obj]
type CreateEventUnion<Events> = ConvertObjectToUnion<
  {
    [P in keyof Events]: {
      type: P
      timestamp?: number // optional since it is added automatically
      committedAt?: number
      payload: Events[P]
    }
  }
  >


