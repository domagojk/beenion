import { JournalEvent, Journal } from '../../types'

const journal = (
  history: JournalEvent[],
  initialState?: Journal
): Journal => history.reduce(journalReducer, initialState)

const journalReducer = (journal: Journal, e: JournalEvent): Journal => {
  switch (e.type) {
    case 'JournalCreated':
      return {
        journalId: e.journalId,
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
    case 'JournalRankCalcEventRemoved':
      return {
        ...journal,
        rankCalcParams: {
          ...journal.rankCalcParams,
          events: journal.rankCalcParams.events.filter(
            params => params.eventType !== e.userEventType
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
              params => params.group !== e.group
            ),
            {
              group: e.group,
              rankRange: e.rankRange
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
            params => params.group !== e.group
          )
        }
      }
    case 'JournalEditorAdded':
      return {
        ...journal,
        editors: {
          ...journal.editors,
          invited: [...journal.editors.invited, e.editorInfo]
        }
      }
    case 'JournalEditorConfirmed':
      return {
        ...journal,
        editors: {
          invited: journal.editors.invited.filter(
            editor => editor !== e.editorId
          ),
          confirmed: [...journal.editors.confirmed, e.editorInfo]
        }
      }
    case 'JournalEditorRemoved':
      return {
        ...journal,
        editors: {
          invited: journal.editors.invited.filter(
            editor => editor !== e.editorId
          ),
          confirmed: journal.editors.confirmed.filter(
            editor => editor !== e.editorId
          )
        }
      }
    case 'JournalPrivilegeDefined':
      return {
        ...journal,
        privileges: {
          ...journal.privileges,
          [e.privilege]: e.permission
        }
      }
    case 'JournalPrivilegeRemoved':
      return {
        ...journal,
        privileges: {
          ...journal.privileges,
          [e.privilege]: null
        }
      }
    case 'JournalStageRuleDefined':
      if (journal.stageRules[e.stage]) {
        return {
          ...journal,
          stageRules: journal.stageRules.map((stageRule, stage) => {
            if (stage === e.stage) {
              return e.stageRule
            }
            return stageRule
          })
        }
      }
      return {
        ...journal,
        stageRules: [
          ...journal.stageRules,
          e.stageRule
        ]
      }
    case 'JournalStageRuleRemoved':
      return {
        ...journal,
        stageRules: journal.stageRules.filter(
          (_stageRule, stage) => stage !== e.stage
        )
      }
    default:
      return journal
  }
}

export default journal
