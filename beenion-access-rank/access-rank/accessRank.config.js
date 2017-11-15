const beenionEvents = require('./beenionEvents')
const beenionPermissions = require('./beenionPermissions')
const beenionRankWeights = require('./beenionRankWeights')
const defaultJournalPermissions = require('./defaultJournalPermissions')
const defaultJournalRankWeights = require('./defaultJournalRankWeights')

const accessRankConfig = {
  version: 1,
  events: beenionEvents,
  permissions: beenionPermissions,
  rankWeights: beenionRankWeights,
  subRank: {
    journal: {
      filterKey: 'journalId',
      defaultPermissions: defaultJournalPermissions,
      defaultRankWeights: defaultJournalRankWeights
    }
  }
}
