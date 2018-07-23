import { validationError } from '../errors'

export function isValidRating(rating: number) {
  if (rating <= 0 || rating >= 100) {
    throw validationError('rating must be in 0-100 range')
  }

  return true
}
