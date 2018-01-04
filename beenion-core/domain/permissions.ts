import calcRank from './calcRank'
import beenionRankCalcParams from './beenionRankCalcParams'
import beenionPrivilegeConditions from './beenionPrivilegeConditions'
import * as t from './types'

// permission checks
export const hasBeenionPermissions = (
  privilege: t.BeenionPrivilege,
  user: t.User
) =>
  isListedUser(beenionPrivilegeConditions[privilege], user) ||
  hasBeenionRank(beenionPrivilegeConditions[privilege], user) ||
  false

export const hasNewsletterPermissions = (
  user: t.User,
  newsletter: t.Newsletter,
  privilege: t.NewsletterPrivilege
) =>
  isListedUser(newsletter.privileges[privilege], user) ||
  hasBeenionRank(newsletter.privileges[privilege], user) ||
  hasNewsletterRank(newsletter.privileges[privilege], user, newsletter) ||
  false

// helper function
const isListedUser = (perm: t.NewsletterPermission, user: t.User) =>
  !!perm && Array.isArray(perm.users) && perm.users.includes(user.userId)

const hasBeenionRank = (perm: t.BeenionPermission, user: t.User) => {
  console.log('aaa', user)
  return (
    !!perm &&
    !!perm.beenionRank &&
    calcRank(user.rankEvents, beenionRankCalcParams) >= perm.beenionRank.min
  )
}

function hasNewsletterRank (
  perm: t.NewsletterPermission,
  user: t.User,
  newsletter: t.Newsletter
) {
  const newsletterEvents = user.rankEvents.filter(
    event =>
      event.newsletterId === undefined || event.newsletterId === newsletter.newsletterId
  )

  return (
    !!perm &&
    !!perm.newsletterRank &&
    calcRank(newsletterEvents, newsletter.rankCalcParams) >= perm.newsletterRank.min
  )
}
