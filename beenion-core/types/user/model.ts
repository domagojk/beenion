import { UserId, JournalId, ArticleId, UserEvent } from '../index'

export type RankEvent = {
  category: 'ArticleVotes' | 'ReviewVotes' | 'UserVotes' | 'UserEvents'
  eventType: UserEvent['type']
  journalId?: JournalId
  articleId?: ArticleId
  voterId?: UserId
}

export type User = {
  userId: UserId
  mergedUserIds: UserId[]
  rankEvents: RankEvent[]
}
