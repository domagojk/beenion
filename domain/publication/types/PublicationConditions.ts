export type PublicationCondition = {
  reviewersWithBeenionRank?: number,
  reviewersWithPublicationRank?: number,
  specificReviewers?: [number]
  threshold: number
}
export type PublicationConditions = [PublicationCondition]
