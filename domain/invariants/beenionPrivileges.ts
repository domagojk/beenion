import { BeenionPrivileges } from 'domain/types/model'

const beenionPrivileges: BeenionPrivileges = {
  canCreatePublication: { beenionRank: 0 },
  canDeletePublication: { beenionRank: 5000 },
  canVoteWithGold: { beenionRank: 1000 },
  canVoteWithSilver: { beenionRank: 500 },
  canVoteWithBronze: { beenionRank: 100 }
}

export default beenionPrivileges
