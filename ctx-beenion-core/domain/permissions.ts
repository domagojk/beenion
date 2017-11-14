import calcRank from './calcRank'
import beenionRankCalcParams from './beenionRankCalcParams'
import beenionPrivilegeConditions from './beenionPrivilegeConditions'
import * as t from '../types'

// permission checks
export const hasBeenionPermissions = (
  privilege: t.BeenionPrivilege,
  user: t.User
) =>
  isListedUser(beenionPrivilegeConditions[privilege], user) ||
  hasBeenionRank(beenionPrivilegeConditions[privilege], user) ||
  false

export const hasJournalPermissions = (
  user: t.User,
  journal: t.Journal,
  privilege: t.JournalPrivilege
) =>
  isListedUser(journal.privileges[privilege], user) ||
  hasBeenionRank(journal.privileges[privilege], user) ||
  hasJournalRank(journal.privileges[privilege], user, journal) ||
  false

// helper function
const isListedUser = (perm: t.JournalPermission, user: t.User) =>
  !!perm && Array.isArray(perm.users) && perm.users.includes(user.userId)

const hasBeenionRank = (perm: t.BeenionPermission, user: t.User) =>
  !!perm &&
  !!perm.beenionRank &&
  calcRank(user.rankEvents, beenionRankCalcParams) >= perm.beenionRank.min

function hasJournalRank (
  perm: t.JournalPermission,
  user: t.User,
  journal: t.Journal
) {
  const journalEvents = user.rankEvents.filter(
    event =>
      event.journalId === undefined || event.journalId === journal.journalId
  )

  return (
    !!perm &&
    !!perm.journalRank &&
    calcRank(journalEvents, journal.rankCalcParams) >= perm.journalRank.min
  )
}
