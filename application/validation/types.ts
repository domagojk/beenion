export const str = x => typeof x === 'string'

export const num = x => typeof x === 'number'

export const UUID = x => typeof x === 'string'

export const URL = x => typeof x === 'string'

export const Title = x => typeof x === 'string'

export const Description = x => typeof x === 'string'

export const Timestamp = x =>
  typeof x === 'number' &&
  x > 1483228800000 // not before 01/01/2017

export const PublicationCondition = () => true

export const PublicationEvent = x =>
  typeof x === 'object' &&
  typeof x.type === 'string' &&
  typeof x.publicationId === 'string'

export const ProjectEvent = x =>
  typeof x === 'object' &&
  typeof x.type === 'string' &&
  typeof x.projectId === 'string'
