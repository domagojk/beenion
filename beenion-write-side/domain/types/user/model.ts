import { UserId, NewsletterId, ArticleId, UserEvent } from '../index'

export type RankEvent = {
  category: 'ArticleVotes' | 'ReviewVotes' | 'UserVotes' | 'UserEvents'
  eventType: UserEvent['type']
  newsletterId?: NewsletterId
  articleId?: ArticleId
  voterId?: UserId
}

export type User = {
  userId: UserId
  mergedUserIds: UserId[]
  rankEvents: RankEvent[]
}
