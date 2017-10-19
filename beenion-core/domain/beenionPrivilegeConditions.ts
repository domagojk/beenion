import { BeenionPrivilegeConditions } from './types/model'

const beenionPrivilegeConditions: BeenionPrivilegeConditions = {
  canCreateJournal: {
    beenionRank: { min: 10 }
  },
  canDeleteJournal: {
    beenionRank: { min: 5000 }
  },
  canVoteWithGold: {
    beenionRank: { min: 1000 }
  },
  canVoteWithSilver: {
    beenionRank: { min: 500 }
  },
  canVoteWithBronze: {
    beenionRank: { min: 100 }
  }
}

export default beenionPrivilegeConditions
