import { LinkParams, Event } from "./types";

const makeEvent = (type: string) => (params: LinkParams): Event => ({
  id: params.linkId,
  payload: params,
  type
})

export const linkCreated = makeEvent('LINK_CREATED')
export const linkMetadataUpdated = makeEvent('LINK_METADATA_UPDATED')
export const linkDeleted = makeEvent('LINK_DELETED')
export const linkReviewersAssigned = makeEvent('LINK_REVIEWERS_ASSIGNED')
export const linkReviewed = makeEvent('LINK_REVIEWED')
export const linkPromoted = makeEvent('LINK_PROMOTED')
export const linkApproved = makeEvent('LINK_APPROVED')
export const linkRejected = makeEvent('LINK_REJECTED')
export const approvedLinkRejected = makeEvent('APPROVED_LINK_REJECTED')
export const linkReviewerRemoved = makeEvent('LINK_REVIEWER_REMOVED')