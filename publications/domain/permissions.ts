import calcRank from './calcRank'
import beenionRankCalcParams from './beenionRankCalcParams'
import {
  User,
  Publication,
  PublicationPermission,
  BeenionPermission
} from './types/model'

export const hasBeenionAccess = (perm: BeenionPermission, user: User) =>
  isListedUser(perm, user) ||
  hasBeenionRank(perm, user)

export const hasPublicationAccess = (
  perm: PublicationPermission,
  user: User,
  pub: Publication
) =>
  isListedUser(perm, user) ||
  hasBeenionRank(perm, user) ||
  hasPublicationRank(perm, user, pub)

export const isListedUser = (perm: PublicationPermission, user: User) =>
  !!perm && Array.isArray(perm.users) &&
  perm.users.includes(user.userId)

export const hasBeenionRank = (perm: BeenionPermission, user: User) =>
  !!perm && !!perm.beenionRank &&
  calcRank(user.rankEvents, beenionRankCalcParams) >= perm.beenionRank.min

export const hasPublicationRank = (
  perm: PublicationPermission,
  user: User,
  pub: Publication
) =>
  !!perm && !!perm.publicationRank &&
  calcRank(
    user.rankEvents.filter(e =>
      e.publicationId === undefined ||
      e.publicationId === pub.publicationId
    ),
    pub.rankCalcParams
  ) >= perm.publicationRank.min
