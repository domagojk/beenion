import { PublicationEvent } from 'domain/types/events'
import { Publication } from 'domain/types/model'

const publication =
  (history: PublicationEvent[], initialState?: Publication): Publication =>
    history.reduce(publicationReducer, initialState)

const publicationReducer =
  (publication: Publication, e: PublicationEvent): Publication => {
    switch (e.type) {
      case 'PublicationCreated':
        return {
          publicationId: e.publicationId,
          privileges: e.privileges,
          rankConditions: e.rankConditions,
          projectStageRules: e.projectStageRules
        }
      case 'ProjectStageRulesUpdated':
        return {
          ...publication,
          projectStageRules: e.projectStageRules
        }
      default:
        return publication
    }
  }

export default publication
