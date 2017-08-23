import { Publication, PublicationEvent } from 'domain/UL/model'

const initialState: Publication = {
  id: null,
  stageRules: [],
  userRankingFactors: {
    UserFlaggedAsSpammer: { factor: -500 },
    UserUnflaggedAsSpammer: { factor: 500 },
    UserFlaggedAsVIP: { factor: 500 },
    UserUnflaggedAsVIP: { factor: -500 },
    UserProjectPublished: { factor: 10 },
    UserReviewMarkedAsHelpfulByOwner: { factor: 1, max: 100 },
    UserReviewMarkedAsHelpfulByReviewer: { factor: 5, max: 500 },
    UserReviewMarkedAsHelpfulByEditor: { factor: 10 },
    UserReviewMarkedAsUnhelpfulByOwner: { factor: -1, min: -100 },
    UserReviewMarkedAsUnhelpfulByReviewer: { factor: -5, min: -500 },
    UserReviewMarkedAsUnhelpfulByEditor: { factor: -10 }
  }
}

function reducer (state: Publication, e: PublicationEvent): Publication {
  switch (e.type) {
    case 'PublicationCreated':
      return {
        id: e.publicationId,
        conditions: e.conditions
      }
    case 'PublicationConditionsUpdated':
      return {
        id: e.publicationId,
        conditions: e.conditions
      }
    default:
      return state
  }
}

export default (history: PublicationEvent[]): Publication =>
  history.reduce(reducer, initialState)
