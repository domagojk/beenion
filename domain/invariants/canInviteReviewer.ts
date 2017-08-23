import { Member, Project } from 'domain/UL/types'

export default (project: Project, reviewer: Member) =>
  reviewer.publicationRank >= project.rules.canReview &&
  project.reviewers.length < project.rules.maxReviewers
