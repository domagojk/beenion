import * as isUrl from 'is-url'
import * as t from 'io-ts'

export const NonNegativeInt = t.refinement(t.Integer, num => num >= 0)
export const String100 = t.refinement(t.string, s => s.length <= 100)
export const Email = t.refinement(t.string, () => /* todo: validation! */ true)
export const After2017 = t.refinement(t.Integer, val => val > 1483228800000)

export const UserId = brand(t.string, 'UserId')
export const ArticleId = brand(t.string, 'ArticleId')
export const JournalId = brand(t.string, 'JournalId')
export const Description = brand(t.string, 'Description')
export const RankGroup = brand(t.string, 'RankGroup')
export const RankFactor = brand(t.Integer, 'RankFactor')
export const Title = brand(String100, 'Title')
export const Timestamp = brand(After2017, 'Timestamp')
export const URL = brand(t.refinement(t.string, isUrl), 'URL')

export const Evaluation = t.union([
  t.literal('approve'),
  t.literal('reject')
])
export const Medal = t.union([
  t.literal('gold'),
  t.literal('silver'),
  t.literal('bronze')
])
export const Rating = t.union([
  t.literal('downvote'),
  t.literal('upvote')
])
export const Stage = t.union([
  t.literal(0),
  t.literal(1),
  t.literal(2),
  t.literal(3),
  t.literal(4)
])
export const JournalPrivilege = t.union([
  t.literal('canUpdateJournal'),
  t.literal('canUpdatePrivilege'),
  t.literal('canUpdateRankCalcParams'),
  t.literal('canUpdateStageRules'),
  t.literal('canUpdateEditor'),
  t.literal('canDeleteJournal'),
  t.literal('canReviewInStage0'),
  t.literal('canReviewInStage1'),
  t.literal('canReviewInStage2'),
  t.literal('canReviewInStage3'),
  t.literal('canReviewInStage4'),
  t.literal('canCreateArticle'),
  t.literal('canDeleteArticle'),
  t.literal('canRejectApprovedArticle'),
  t.literal('canBanArticle'),
  t.literal('canUpdateArticle'),
  t.literal('canResubmitArticle'),
  t.literal('canRateReviewWithGold'),
  t.literal('canRateReviewWithSilver'),
  t.literal('canRateReviewWithBronze'),
  t.literal('canRateArticleWithGold'),
  t.literal('canRateArticleWithSilver'),
  t.literal('canRateArticleWithBronze')
])
export const BeenionPrivilege = t.union([
  t.literal('canCreateJournal'),
  t.literal('canDeleteJournal'),
  t.literal('canRateUserWithGold'),
  t.literal('canRateUserWithSilver'),
  t.literal('canRateUserWithBronze')
])

export const UserInfo = t.partial({
  beenionId: UserId,
  email: Email,
  twitterHandle: t.string
})

const Min = t.type({ min: t.Integer })
const Max = t.partial({ max: NonNegativeInt })
export const RankRange = t.intersection([ Min, Max ])

const JournalRank = t.partial({ journalRank: RankRange })
const BeenionRank = t.partial({ beenionRank: RankRange })
const Users = t.partial({ users: t.array(UserId) })

export const StageRule = t.type({
  maxReviewers: NonNegativeInt,
  threshold: NonNegativeInt
})
export const StageRules = t.array(StageRule)

export const JournalPermission = t.intersection([
  JournalRank,
  BeenionRank,
  Users
])

export const BeenionPermission = t.intersection([
  BeenionRank,
  Users
])

// helper function for creating nominal type in TS
// by using intersection with { __brand: Type }
// https://github.com/Microsoft/TypeScript/issues/202
function brand<T, B extends string> (
  type: t.Type<T>,
  _brand: B
): t.Type<T & { readonly __brand: B }> {
  return type as any
}
