import * as isUrl from 'is-url'
import * as t from 'io-ts'

export const ProposalId = t.string
export const TemplateId = t.string
export const IssueId = t.string
export const NewsletterStages = t.string
export const NewsletterPermissions = t.string
export const Duration = t.string
export const NewsletterCategory = t.string
export const IssueLinks = t.string
export const Avaiability = t.string
export const ReviewersRating = t.string
export const ProposalAction = t.string
export const UserGroup = t.string

export const NonNegativeInt = t.refinement(t.Integer, num => num >= 0)
export const Email = t.refinement(t.string, () => /* todo: validation! */ true)
export const After2017 = t.refinement(t.Integer, val => val > 1483228800000)

export const UserId = brand(t.string, 'UserId')
export const LinkId = brand(t.string, 'LinkId')
export const NewsletterId = brand(t.string, 'NewsletterId')
export const Description = brand(t.string, 'Description')
export const Title = brand(t.string, 'Title')
export const Timestamp = brand(After2017, 'Timestamp')
export const URL = brand(t.refinement(t.string, isUrl), 'URL')

export const Evaluation = t.union([
  t.literal('approve'),
  t.literal('reject')
])

export const UserInfo = t.partial({
  beenionId: UserId,
  email: Email,
  twitterHandle: t.string
})

// helper function for creating nominal type in TS
// by using intersection with { __brand: Type }
// https://github.com/Microsoft/TypeScript/issues/202
function brand<T, B extends string> (
  type: t.Type<any, T>,
  _brand: B
): t.Type<any, T & { __brand: B }> {
  return type as any
}
