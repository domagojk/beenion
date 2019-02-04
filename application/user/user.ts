import { EventStore } from '../../infrastructure/databases/eventstore/eventStore'
import { userApi } from '../../infrastructure/databases/users/userApi'
import { userFollowingReducer } from '../../model/user/reducers/userFollowingReducer'
import { follow } from '../../model/user/command/follow'
import { unfollow } from '../../model/user/command/unfollow'

export const userCommandHandlers = (
  eventStore: EventStore,
  userId: string
) => ({
  follow: async (params: { username: string }) => {
    const followUserId = await userApi.getUserIdByUsername(params.username)
    const currentUserEvents = await eventStore.getById(userId, {
      returnEmptyArrOn404: true
    })

    const toCommit = follow({
      userFollowers: userFollowingReducer(currentUserEvents),
      followUserId,
      userId
    })

    return eventStore.save({
      events: toCommit,
      streamId: userId,
      expectedVersion: currentUserEvents.length
    })
  },

  unfollow: async (params: { username: string }) => {
    const unfollowedUserId = await userApi.getUserIdByUsername(params.username)
    const currentUserEvents = await eventStore.getById(userId, {
      returnEmptyArrOn404: true
    })

    const toCommit = unfollow({
      userFollowers: userFollowingReducer(currentUserEvents),
      unfollowedUserId,
      userId
    })

    return eventStore.save({
      events: toCommit,
      streamId: userId,
      expectedVersion: currentUserEvents.length
    })
  }
})
