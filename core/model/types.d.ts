import { TypeOf } from 'io-ts'
import * as input from './inputTypes'
import * as linkCommands from './link/commands'
import * as newsletterCommands from './newsletter/commands'

// basic input types
export type UserId = {}
export type IssueId = {}
export type ProposalId = {}
export type TemplateId = {}
export type Email = {}
export type NonNegativeInt = {}
export type NewsletterCategory = {}
export type IssueLinks = {}
export type IssueNum = {}
export type Stages = {}
export type NewsletterPermissions = {}
export type Availability = {}
export type ReviewersRating = {}
export type Decision = {}
export type ProposalAction = {}
export type Duration = {}

export type UserInfo = TypeOf<typeof input.UserInfo>
export type LinkId = TypeOf<typeof input.LinkId>
export type NewsletterId = TypeOf<typeof input.NewsletterId>
export type Title = TypeOf<typeof input.Title>
export type Description = TypeOf<typeof input.Description>
export type URL = TypeOf<typeof input.URL>
export type Timestamp = TypeOf<typeof input.Timestamp>
export type Evaluation = TypeOf<typeof input.Evaluation>

// command types
export type SystemLinkCommands = TypeOf<typeof linkCommands.systemCommands>
export type UserLinkCommands = TypeOf<typeof linkCommands.userCommands>
export type LinkCommands = SystemLinkCommands & UserLinkCommands

export type SystemNewsletterCommands = TypeOf<typeof newsletterCommands.systemCommands>
export type UserNewsletterCommands = TypeOf<typeof newsletterCommands.userCommands>
export type NewsletterCommands = SystemNewsletterCommands & UserNewsletterCommands

export type UserCommands = UserLinkCommands & UserNewsletterCommands

export type PickCommand<Command extends keyof UserCommands> = {
  [prop in keyof Pick<UserCommands, Command>[Command]['payload']]: any
}
