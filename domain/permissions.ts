import calcRank from './calcRank'
import beenionRankCalcParams from './beenionRankCalcParams'
import {
  User,
  Publication,
  PublicationPermission,
  BeenionPermission
} from './types/model'

export const hasBeenionAccess = (perm: BeenionPermission, user: User) =>
  perm &&
  (
    isListedUser(perm, user) ||
    hasBeenionRank(perm, user)
  ) || false

export const hasPublicationAccess = (
  perm: PublicationPermission,
  user: User,
  pub: Publication
) =>
  perm &&
  (
    isListedUser(perm, user) ||
    hasBeenionRank(perm, user) ||
    hasPublicationRank(perm, user, pub)
  ) || false

export const isListedUser = (perm: PublicationPermission, user: User) =>
  perm.users &&
  perm.users.includes(user.userId)

export const hasBeenionRank = (perm: BeenionPermission, user: User) => {
  return (
    perm.beenionRank !== undefined &&
    calcRank(user.rankEvents, beenionRankCalcParams) >= perm.beenionRank.min
  )
}

export const hasPublicationRank = (
  perm: PublicationPermission,
  user: User,
  pub: Publication
) =>
  perm.publicationRank !== undefined &&
  calcRank(
    user.rankEvents.filter(e =>
      e.publicationId === undefined ||
      e.publicationId === pub.publicationId
    ),
    pub.rankCalcParams
  ) >= perm.publicationRank.min
