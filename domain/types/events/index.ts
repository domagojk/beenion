import * as ProjectEvents from './projectEvents'
import * as PublicationEvents from './publicationEvents'
import * as UserEvents from './userEvents'

export type ProjectEvent =
| ProjectEvents.ProjectCreated
| ProjectEvents.ProjectDeleted
| ProjectEvents.ProjectDescriptionUpdated
| ProjectEvents.ProjectLinkUpdated
| ProjectEvents.ProjectTitleUpdated
| ProjectEvents.ProjectPromoted
| ProjectEvents.ProjectResubmitted
| ProjectEvents.ProjectReviewerInvited
| ProjectEvents.ProjectReviewerInviteFailed
| ProjectEvents.ProjectReviewerRemoved
| ProjectEvents.ProjectReviewed
| ProjectEvents.ProjectBanned
| ProjectEvents.ProjectUnbanned

export type PublicationEvent =
| PublicationEvents.PublicationCreated
| PublicationEvents.ProjectStageRulesUpdated
| PublicationEvents.PublicationDeleted
| PublicationEvents.PublicationTitleUpdated
| PublicationEvents.PublicationDescriptionUpdated

export type UserEvent =
| UserEvents.UserCreated
| UserEvents.ReviewInvitationAccepted
| UserEvents.ReviewInvitationDeclined
| UserEvents.ReviewInvitationExpired
| UserEvents.ProjectUpvotedWithGold
| UserEvents.ProjectUpvotedWithSilver
| UserEvents.ProjectUpvotedWithBronze
| UserEvents.ProjectDownvotedWithGold
| UserEvents.ProjectDownvotedWithSilver
| UserEvents.ProjectDownvotedWithBronze
| UserEvents.ReviewUpvotedWithGold
| UserEvents.ReviewUpvotedWithSilver
| UserEvents.ReviewUpvotedWithBronze
| UserEvents.ReviewDownvotedWithGold
| UserEvents.ReviewDownvotedWithSilver
| UserEvents.ReviewDownvotedWithBronze
| UserEvents.UserUpvotedWithGold
| UserEvents.UserUpvotedWithSilver
| UserEvents.UserUpvotedWithBronze
| UserEvents.UserDownvotedWithGold
| UserEvents.UserDownvotedWithSilver
| UserEvents.UserDownvotedWithBronze
