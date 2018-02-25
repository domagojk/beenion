import { NewsletterEvent, Newsletter } from '../types'

const reduceToNewsletter = (
  history: NewsletterEvent[],
  initialState?: Newsletter
): Newsletter => history.reduce(newsletterReducer, initialState)

const newsletterReducer = (newsletter: Newsletter, e: NewsletterEvent): Newsletter => {
  switch (e.type) {
    case 'NewsletterCreated':
      return {
        newsletterId: e.payload.newsletterId,
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
    case 'NewsletterRankEventDefined':
      return {
        ...newsletter,
        rankCalcParams: {
          ...newsletter.rankCalcParams,
          events: [
            ...newsletter.rankCalcParams.events.filter(
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
    case 'NewsletterRankEventRemoved':
      return {
        ...newsletter,
        rankCalcParams: {
          ...newsletter.rankCalcParams,
          events: newsletter.rankCalcParams.events.filter(
            params => params.eventType !== e.payload.userEventType
          )
        }
      }
    case 'NewsletterRankGroupDefined':
      return {
        ...newsletter,
        rankCalcParams: {
          ...newsletter.rankCalcParams,
          groups: [
            ...newsletter.rankCalcParams.groups.filter(
              params => params.group !== e.payload.group
            ),
            {
              group: e.payload.group,
              rankRange: e.payload.rankRange
            }
          ]
        }
      }
    case 'NewsletterRankGroupRemoved':
      return {
        ...newsletter,
        rankCalcParams: {
          ...newsletter.rankCalcParams,
          groups: newsletter.rankCalcParams.groups.filter(
            params => params.group !== e.payload.group
          )
        }
      }
    case 'NewsletterEditorAdded':
      return {
        ...newsletter,
        editors: {
          ...newsletter.editors,
          invited: [...newsletter.editors.invited, e.payload.editorInfo]
        }
      }
    case 'NewsletterEditorConfirmed':
      return {
        ...newsletter,
        editors: {
          invited: newsletter.editors.invited.filter(
            editor => editor !== e.payload.editorId
          ),
          confirmed: [...newsletter.editors.confirmed, e.payload.editorInfo]
        }
      }
    case 'NewsletterEditorRemoved':
      return {
        ...newsletter,
        editors: {
          invited: newsletter.editors.invited.filter(
            editor => editor !== e.payload.editorId
          ),
          confirmed: newsletter.editors.confirmed.filter(
            editor => editor !== e.payload.editorId
          )
        }
      }
    case 'NewsletterPrivilegeDefined':
      return {
        ...newsletter,
        privileges: {
          ...newsletter.privileges,
          [e.payload.privilege]: e.payload.permission
        }
      }
    case 'NewsletterPrivilegeRemoved':
      return {
        ...newsletter,
        privileges: {
          ...newsletter.privileges,
          [e.payload.privilege]: null
        }
      }
    case 'NewsletterStageRuleDefined':
      if (newsletter.stageRules[e.payload.stage]) {
        return {
          ...newsletter,
          stageRules: newsletter.stageRules.map((stageRule, stage) => {
            if (stage === e.payload.stage) {
              return e.payload.stageRule
            }
            return stageRule
          })
        }
      }
      return {
        ...newsletter,
        stageRules: [
          ...newsletter.stageRules,
          e.payload.stageRule
        ]
      }
    case 'NewsletterStageRuleRemoved':
      return {
        ...newsletter,
        stageRules: newsletter.stageRules.filter(
          (_stageRule, stage) => stage !== e.payload.stage
        )
      }
    default:
      return newsletter
  }
}

export default reduceToNewsletter
