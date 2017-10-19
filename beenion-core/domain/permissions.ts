import calcRank from './calcRank'
import beenionRankCalcParams from './beenionRankCalcParams'
import {
  User,
  Journal,
  JournalPermission,
  BeenionPermission
} from './types/model'

export const hasBeenionAccess = (perm: BeenionPermission, user: User) =>
  isListedUser(perm, user) ||
  hasBeenionRank(perm, user)

export const hasJournalAccess = (
  perm: JournalPermission,
  user: User,
  journal: Journal
) =>
  isListedUser(perm, user) ||
  hasBeenionRank(perm, user) ||
  hasJournalRank(perm, user, journal)

export const isListedUser = (perm: JournalPermission, user: User) =>
  !!perm && Array.isArray(perm.users) &&
  perm.users.includes(user.userId)

export const hasBeenionRank = (perm: BeenionPermission, user: User) =>
  !!perm && !!perm.beenionRank &&
  calcRank(user.rankEvents, beenionRankCalcParams) >= perm.beenionRank.min

export const hasJournalRank = (
  perm: JournalPermission,
  user: User,
  journal: Journal
) =>
  !!perm && !!perm.journalRank &&
  calcRank(
    user.rankEvents.filter(e =>
      e.journalId === undefined ||
      e.journalId === journal.journalId
    ),
    journal.rankCalcParams
  ) >= perm.journalRank.min
