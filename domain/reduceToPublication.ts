import { PublicationEvent } from './types/events'
import { Publication } from './types/model'

const publication = (
  history: PublicationEvent[],
  initialState?: Publication
): Publication => history.reduce(publicationReducer, initialState)

const publicationReducer = (publication: Publication, e: PublicationEvent): Publication => {
  switch (e.type) {
    case 'PublicationCreated':
      return {
        publicationId: e.publicationId,
        privilegeConditions: null,
        rankCalcParams: {
          events: [],
          groups: []
        },
        editors: {
          invited: [],
          confirmed: []
        },
        stageRules: []
      }
    case 'PublicationRankCalcEventDefined':
      return {
        ...publication,
        rankCalcParams: {
          ...publication.rankCalcParams,
          events: [
            ...publication.rankCalcParams.events.filter(
              params => params.eventType !== e.userEventType
            ),
            {
              eventType: e.userEventType,
              group: e.group,
              factor: e.factor
            }
          ]
        }
      }
    case 'PublicationRankCalcEventRemoved':
      return {
        ...publication,
        rankCalcParams: {
          ...publication.rankCalcParams,
          events: publication.rankCalcParams.events.filter(
            params => params.eventType !== e.userEventType
          )
        }
      }
    case 'PublicationRankCalcGroupDefined':
      return {
        ...publication,
        rankCalcParams: {
          ...publication.rankCalcParams,
          groups: [
            ...publication.rankCalcParams.groups.filter(
              params => params.group !== e.group
            ),
            {
              group: e.group,
              rankRange: e.rankRange
            }
          ]
        }
      }
    case 'PublicationRankCalcGroupRemoved':
      return {
        ...publication,
        rankCalcParams: {
          ...publication.rankCalcParams,
          groups: publication.rankCalcParams.groups.filter(
            params => params.group !== e.group
          )
        }
      }
    case 'PublicationEditorAdded':
      return {
        ...publication,
        editors: {
          ...publication.editors,
          invited: [...publication.editors.invited, e.editorId]
        }
      }
    case 'PublicationEditorConfirmed':
      return {
        ...publication,
        editors: {
          invited: publication.editors.invited.filter(
            editor => editor !== e.editorId
          ),
          confirmed: [...publication.editors.confirmed, e.confirmedEditorId]
        }
      }
    case 'PublicationEditorRemoved':
      return {
        ...publication,
        editors: {
          invited: publication.editors.invited.filter(
            editor => editor !== e.editorId
          ),
          confirmed: publication.editors.confirmed.filter(
            editor => editor !== e.editorId
          )
        }
      }
    case 'PublicationPrivilegeDefined':
      return {
        ...publication,
        privilegeConditions: {
          ...publication.privilegeConditions,
          [e.privilege]: e.permission
        }
      }
    case 'PublicationPrivilegeRemoved':
      return {
        ...publication,
        privilegeConditions: {
          ...publication.privilegeConditions,
          [e.privilege]: null
        }
      }
    case 'PublicationStageRuleDefined':
      if (publication.stageRules[e.stage]) {
        return {
          ...publication,
          stageRules: publication.stageRules.map((stageRule, stage) => {
            if (stage === e.stage) {
              return e.stageRule
            }
            return stageRule
          })
        }
      }
      return {
        ...publication,
        stageRules: [
          ...publication.stageRules,
          e.stageRule
        ]
      }
    case 'PublicationStageRuleRemoved':
      return {
        ...publication,
        stageRules: publication.stageRules.filter(
          (_stageRule, stage) => stage !== e.stage
        )
      }
    default:
      return publication
  }
}

export default publication
