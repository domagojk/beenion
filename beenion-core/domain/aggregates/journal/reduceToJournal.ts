import { JournalEvent, Journal } from '../../types'

const reduceToJournal = (
  history: JournalEvent[],
  initialState?: Journal
): Journal => history.reduce(journalReducer, initialState)

const journalReducer = (journal: Journal, e: JournalEvent): Journal => {
  switch (e.type) {
    case 'JournalCreated':
      return {
        journalId: e.payload.journalId,
        privileges: null,
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
    case 'JournalRankCalcEventDefined':
      return {
        ...journal,
        rankCalcParams: {
          ...journal.rankCalcParams,
          events: [
            ...journal.rankCalcParams.events.filter(
              params => params.eventType !== e.payload.userEventType
            ),
            {
              eventType: e.payload.userEventType,
              group: e.payload.group,
              factor: e.payload.factor
            }
          ]
        }
      }
    case 'JournalRankCalcEventRemoved':
      return {
        ...journal,
        rankCalcParams: {
          ...journal.rankCalcParams,
          events: journal.rankCalcParams.events.filter(
            params => params.eventType !== e.payload.userEventType
          )
        }
      }
    case 'JournalRankCalcGroupDefined':
      return {
        ...journal,
        rankCalcParams: {
          ...journal.rankCalcParams,
          groups: [
            ...journal.rankCalcParams.groups.filter(
              params => params.group !== e.payload.group
            ),
            {
              group: e.payload.group,
              rankRange: e.payload.rankRange
            }
          ]
        }
      }
    case 'JournalRankCalcGroupRemoved':
      return {
        ...journal,
        rankCalcParams: {
          ...journal.rankCalcParams,
          groups: journal.rankCalcParams.groups.filter(
            params => params.group !== e.payload.group
          )
        }
      }
    case 'JournalEditorAdded':
      return {
        ...journal,
        editors: {
          ...journal.editors,
          invited: [...journal.editors.invited, e.payload.editorInfo]
        }
      }
    case 'JournalEditorConfirmed':
      return {
        ...journal,
        editors: {
          invited: journal.editors.invited.filter(
            editor => editor !== e.payload.editorId
          ),
          confirmed: [...journal.editors.confirmed, e.payload.editorInfo]
        }
      }
    case 'JournalEditorRemoved':
      return {
        ...journal,
        editors: {
          invited: journal.editors.invited.filter(
            editor => editor !== e.payload.editorId
          ),
          confirmed: journal.editors.confirmed.filter(
            editor => editor !== e.payload.editorId
          )
        }
      }
    case 'JournalPrivilegeDefined':
      return {
        ...journal,
        privileges: {
          ...journal.privileges,
          [e.payload.privilege]: e.payload.permission
        }
      }
    case 'JournalPrivilegeRemoved':
      return {
        ...journal,
        privileges: {
          ...journal.privileges,
          [e.payload.privilege]: null
        }
      }
    case 'JournalStageRuleDefined':
      if (journal.stageRules[e.payload.stage]) {
        return {
          ...journal,
          stageRules: journal.stageRules.map((stageRule, stage) => {
            if (stage === e.payload.stage) {
              return e.payload.stageRule
            }
            return stageRule
          })
        }
      }
      return {
        ...journal,
        stageRules: [
          ...journal.stageRules,
          e.payload.stageRule
        ]
      }
    case 'JournalStageRuleRemoved':
      return {
        ...journal,
        stageRules: journal.stageRules.filter(
          (_stageRule, stage) => stage !== e.payload.stage
        )
      }
    default:
      return journal
  }
}

export default reduceToJournal
