import { UserEvent, PublicationEvent, Member } from 'domain/UL'

const reducer = (rank: number, e: UserEvent): Member => {
  switch (e.type) {
    case 'UserCreated':
      return rank - 1
    case 'OwnerMarkedReviewAsHelpful':
      return rank + 1
    default:
      return rank
  }
}

export default (userHistory: UserEvent[], publicationHistory: PublicationEvent[]): number =>
  history
    .filter(e => e.publicationId === publication.id)
    .reduce(reducer, 0)
