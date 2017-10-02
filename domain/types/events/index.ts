import * as ProjectEvents from './projectEvents'
import * as PublicationEvents from './publicationEvents'
import * as UserEvents from './userEvents'

export type ProjectEvent =
| ProjectEvents.ProjectCreated
| ProjectEvents.ProjectDeleted
| ProjectEvents.ProjectStageRulesDefined
| ProjectEvents.ProjectDescriptionDefined
| ProjectEvents.ProjectLinkDefined
| ProjectEvents.ProjectTitleDefined
| ProjectEvents.ProjectPromoted
| ProjectEvents.ProjectApproved
| ProjectEvents.ProjectRejected
| ProjectEvents.ApprovedProjectRejected
| ProjectEvents.ProjectResubmitted
| ProjectEvents.ProjectReviewerInvited
| ProjectEvents.ProjectReviewerRemoved
| ProjectEvents.ProjectReviewed
| ProjectEvents.ProjectBanned
| ProjectEvents.ProjectUnbanned

export type PublicationEvent =
| PublicationEvents.PublicationCreated
| PublicationEvents.PublicationDeleted
| PublicationEvents.PublicationTitleDefined
| PublicationEvents.PublicationDescriptionDefined
| PublicationEvents.PublicationRankCalcEventDefined
| PublicationEvents.PublicationRankCalcEventRemoved
| PublicationEvents.PublicationRankCalcGroupDefined
| PublicationEvents.PublicationRankCalcGroupRemoved
| PublicationEvents.PublicationEditorAdded
| PublicationEvents.PublicationEditorConfirmed
| PublicationEvents.PublicationEditorRemoved
| PublicationEvents.PublicationPrivilegeDefined
| PublicationEvents.PublicationPrivilegeRemoved
| PublicationEvents.PublicationStageRuleDefined
| PublicationEvents.PublicationStageRuleRemoved

export type UserEvent =
| UserEvents.UserCreated
| UserEvents.UserAccountMerged
| UserEvents.ReviewInvitationDeclined
| UserEvents.ReviewInvitationExpired
| UserEvents.ProjectUpvotedWithGold
| UserEvents.ProjectUpvotedWithSilver
| UserEvents.ProjectUpvotedWithBronze
| UserEvents.ProjectDownvotedWithGold
| UserEvents.ProjectDownvotedWithSilver
| UserEvents.ProjectDownvotedWithBronze
| UserEvents.ProjectVoteWithdrawn
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
