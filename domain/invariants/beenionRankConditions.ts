import { BeenionRankConditions } from 'domain/types/model'

const beenionRankConditions: BeenionRankConditions = {
  // user upvotes
  UserUpvotedWithGold: { factor: 100, min: 0, max: 1000 },
  UserUpvotedWithSilver: { factor: 10, min: 0, max: 100 },
  UserUpvotedWithBronze: { factor: 1, min: 0, max: 100 },
  // user downvotes
  UserDownvotedWithGold: { factor: -100, min: -1000, max: 0 },
  UserDownvotedWithSilver: { factor: -10, min: -100, max: 0 },
  UserDownvotedWithBronze: { factor: -1, min: -100, max: 0 }
}

export default beenionRankConditions
