import { Member, Project } from 'domain/UL/types'

export default (project: Project, reviewer: Member) =>
  project.reviewers.includes(reviewer.userId)
