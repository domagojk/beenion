import { Member, Publication, Project } from 'domain/UL/types'

export default (member: Member, project: Project, publication: Publication) =>
  project.ownerId === member.userId ||
  member.publicationRank >= publication.privileges.canDeleteProject
