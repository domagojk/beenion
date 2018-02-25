import { TypeOf } from 'io-ts'
import * as input from './input.io'
import * as linkCommands from './link/commands'
import * as newsletterCommands from './newsletter/commands.io'

// event types
export { NewsletterEvents } from './newsletter/events.d'

// basic input types
export type UserId = {}
export type UserGroup = {}
export type IssueId = {}
export type ProposalId = {}
export type TemplateId = {}
export type Email = {}
export type NonNegativeInt = {}
export type IssueLinks = {}
export type IssueNum = {}
export type Stages = {}
export type NewsletterPermissions = {}
export type Availability = {}
export type ReviewersRating = {}
export type Decision = {}
export type ProposalAction = {}
export type Duration = {}

export type NewsletterCategory = TypeOf<typeof input.NewsletterCategory>
export type UserInfo = TypeOf<typeof input.UserInfo>
export type LinkId = TypeOf<typeof input.LinkId>
export type NewsletterId = TypeOf<typeof input.NewsletterId>
export type Title = TypeOf<typeof input.Title>
export type Description = TypeOf<typeof input.Description>
export type URL = TypeOf<typeof input.URL>
export type Timestamp = TypeOf<typeof input.Timestamp>
export type Evaluation = TypeOf<typeof input.Evaluation>
