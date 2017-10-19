import * as ArticleEvents from './articleEvents'
import * as JournalEvents from './journalEvents'
import * as UserEvents from './userEvents'

export type ArticleEvent =
| ArticleEvents.ArticleCreated
| ArticleEvents.ArticleDeleted
| ArticleEvents.ArticleStageRulesDefined
| ArticleEvents.ArticleDescriptionDefined
| ArticleEvents.ArticleLinkDefined
| ArticleEvents.ArticleTitleDefined
| ArticleEvents.ArticlePromoted
| ArticleEvents.ArticleApproved
| ArticleEvents.ArticleRejected
| ArticleEvents.ApprovedArticleRejected
| ArticleEvents.ArticleResubmitted
| ArticleEvents.ArticleReviewerInvited
| ArticleEvents.ArticleReviewerRemoved
| ArticleEvents.ArticleReviewed
| ArticleEvents.ArticleBanned
| ArticleEvents.ArticleUnbanned

export type JournalEvent =
| JournalEvents.JournalCreated
| JournalEvents.JournalDeleted
| JournalEvents.JournalTitleDefined
| JournalEvents.JournalDescriptionDefined
| JournalEvents.JournalRankCalcEventDefined
| JournalEvents.JournalRankCalcEventRemoved
| JournalEvents.JournalRankCalcGroupDefined
| JournalEvents.JournalRankCalcGroupRemoved
| JournalEvents.JournalEditorAdded
| JournalEvents.JournalEditorConfirmed
| JournalEvents.JournalEditorRemoved
| JournalEvents.JournalPrivilegeDefined
| JournalEvents.JournalPrivilegeRemoved
| JournalEvents.JournalStageRuleDefined
| JournalEvents.JournalStageRuleRemoved

export type UserEvent =
| UserEvents.UserCreated
| UserEvents.UserAccountMerged
| UserEvents.ReviewInvitationDeclined
| UserEvents.ReviewInvitationExpired
| UserEvents.ArticleUpvotedWithGold
| UserEvents.ArticleUpvotedWithSilver
| UserEvents.ArticleUpvotedWithBronze
| UserEvents.ArticleDownvotedWithGold
| UserEvents.ArticleDownvotedWithSilver
| UserEvents.ArticleDownvotedWithBronze
| UserEvents.ArticleVoteWithdrawn
| UserEvents.ReviewUpvotedWithGold
| UserEvents.ReviewUpvotedWithSilver
| UserEvents.ReviewUpvotedWithBronze
| UserEvents.ReviewDownvotedWithGold
| UserEvents.ReviewDownvotedWithSilver
| UserEvents.ReviewDownvotedWithBronze
| UserEvents.ReviewVoteWithdrawn
| UserEvents.UserUpvotedWithGold
| UserEvents.UserUpvotedWithSilver
| UserEvents.UserUpvotedWithBronze
| UserEvents.UserDownvotedWithGold
| UserEvents.UserDownvotedWithSilver
| UserEvents.UserDownvotedWithBronze
| UserEvents.UserVoteWithdrawn
