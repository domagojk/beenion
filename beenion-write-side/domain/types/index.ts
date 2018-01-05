import { TypeOf } from 'io-ts'
import * as input from './input'
import { ArticleEvent as ArticleEventIo } from './article/events'
import { NewsletterEvent as NewsletterEventIo } from './newsletter/events'
import { UserEvent as UserEventIo } from './user/events'
import * as articleCommands from './article/commands'
import * as newsletterCommands from './newsletter/commands'
import * as userCommands from './user/commands'

// basic input types
export type UserId = TypeOf<typeof input.UserId>
export type UserInfo = TypeOf<typeof input.UserInfo>
export type ArticleId = TypeOf<typeof input.ArticleId>
export type NewsletterId = TypeOf<typeof input.NewsletterId>
export type Title = TypeOf<typeof input.Title>
export type Description = TypeOf<typeof input.Description>
export type URL = TypeOf<typeof input.URL>
export type RankGroup = TypeOf<typeof input.RankGroup>
export type RankFactor = TypeOf<typeof input.RankFactor>
export type Timestamp = TypeOf<typeof input.Timestamp>
export type Evaluation = TypeOf<typeof input.Evaluation>
export type Medal = TypeOf<typeof input.Medal>
export type Rating = TypeOf<typeof input.Rating>
export type Stage = TypeOf<typeof input.Stage>
export type StageRules = TypeOf<typeof input.StageRules>
export type NewsletterPrivilege = TypeOf<typeof input.NewsletterPrivilege>
export type BeenionPrivilege = TypeOf<typeof input.BeenionPrivilege>
export type RankRange = TypeOf<typeof input.RankRange>
export type NewsletterPermission = TypeOf<typeof input.NewsletterPermission>
export type BeenionPermission = TypeOf<typeof input.BeenionPermission>

// command types
export type PublicUserCommands = TypeOf<typeof userCommands.publicCommands>
export type UserCommands = PublicUserCommands

export type PrivateArticleCommands = TypeOf<typeof articleCommands.privateCommands>
export type PublicArticleCommands = TypeOf<typeof articleCommands.publicCommands>
export type ArticleCommands = PrivateArticleCommands & PublicArticleCommands

export type PrivateNewsletterCommands = TypeOf<typeof newsletterCommands.privateCommands>
export type PublicNewsletterCommands = TypeOf<typeof newsletterCommands.publicCommands>
export type NewsletterCommands = PrivateNewsletterCommands & PublicNewsletterCommands

export type PublicCommands =
  & PublicNewsletterCommands
  & PublicArticleCommands
  & PublicUserCommands

export type PickCommand<Command extends keyof PublicCommands> = {
  [prop in keyof Pick<PublicCommands, Command>[Command]['payload']]: any
}

// event types
export type ArticleEvent = TypeOf<typeof ArticleEventIo>
export type NewsletterEvent = TypeOf<typeof NewsletterEventIo>
export type UserEvent = TypeOf<typeof UserEventIo>

// model types
export * from './article/model'
export * from './newsletter/model'
export * from './user/model'

// repository types
export * from './article/repository'
export * from './newsletter/repository'
export * from './user/repository'
