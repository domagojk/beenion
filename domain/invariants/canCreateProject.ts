import { Member, Publication } from 'domain/UL/types'

export default (member: Member, publication: Publication) =>
  member.publicationRank >= publication.privileges.canCreateProject
