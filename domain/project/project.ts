import eventHandlers from './ProjectEventHandlers'
import commandHandlers from './ProjectCommandHandlers'
import makeAggregate from 'core/makeAggregate'

/**
 * create Aggregate class using
 * command and event handlers
 */
const Project = makeAggregate(commandHandlers, eventHandlers)

/**
 * using IProject interface is optional.
 * Since makeAggregate() creates dynamic methods which
 * typescript fails to recognize, this helps
 * code editors to provide usefull intellisense.
 */
export interface IProject {
  new (id, userId, name, description, link): Iproject
}

export interface Iproject {
  updateDetails(name, description, link)
  rateProject(rating)
  assignReviewer(reviewerId)
  removeReviewer(reviewerId)
  resubmit()
  delete()
}

export default <IProject>Project
