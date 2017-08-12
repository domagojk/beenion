import { Reviewer, PublicationCondition } from 'domain/UL'

function canReviewProject (reviewer: Reviewer, condition: PublicationCondition): boolean {
  switch (condition.type) {
    case 'SpecificReviewers':
      return condition.reviewers.includes(reviewer.id)
    case 'PublicationRank':
      return reviewer.publicationRank > condition.rank
    case 'BeenionRank':
      return reviewer.beenionRank > condition.rank
  }
}

export default canReviewProject
