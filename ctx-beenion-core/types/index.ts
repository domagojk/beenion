import { TypeOf } from 'io-ts'
import * as input from './input'
import { ArticleEvent as ArticleEventIo } from './article/events'
import { JournalEvent as JournalEventIo } from './journal/events'
import { UserEvent as UserEventIo } from './user/events'
import * as articleCommands from './article/commands'
import * as journalCommands from './journal/commands'
import * as userCommands from './user/commands'

// basic input types
export type UserId = TypeOf<typeof input.UserId>
export type UserInfo = TypeOf<typeof input.UserInfo>
export type ArticleId = TypeOf<typeof input.ArticleId>
export type JournalId = TypeOf<typeof input.JournalId>
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
export type JournalPrivilege = TypeOf<typeof input.JournalPrivilege>
export type BeenionPrivilege = TypeOf<typeof input.BeenionPrivilege>
export type RankRange = TypeOf<typeof input.RankRange>
export type JournalPermission = TypeOf<typeof input.JournalPermission>
export type BeenionPermission = TypeOf<typeof input.BeenionPermission>

// command types
export type PrivateUserCommands = TypeOf<typeof userCommands.privateCommands>
export type PublicUserCommands = TypeOf<typeof userCommands.publicCommands>
export type UserCommands = PrivateUserCommands & PublicUserCommands

export type PrivateArticleCommands = TypeOf<typeof articleCommands.privateCommands>
export type PublicArticleCommands = TypeOf<typeof articleCommands.publicCommands>
export type ArticleCommands = PrivateArticleCommands & PublicArticleCommands

export type PrivateJournalCommands = TypeOf<typeof journalCommands.privateCommands>
export type PublicJournalCommands = TypeOf<typeof journalCommands.publicCommands>
export type JournalCommands = PrivateJournalCommands & PublicJournalCommands

export type PublicCommands =
  & PublicJournalCommands
  & PublicArticleCommands
  & PublicUserCommands

export type PickCommand<Command extends keyof PublicCommands> = {
  [prop in keyof Pick<PublicCommands, Command>[Command]['payload']]: any
}

// event types
export type ArticleEvent = TypeOf<typeof ArticleEventIo>
export type JournalEvent = TypeOf<typeof JournalEventIo>
export type UserEvent = TypeOf<typeof UserEventIo>

// model types
export * from './article/model'
export * from './journal/model'
export * from './user/model'

// repository types
export * from './article/repository'
export * from './journal/repository'
export * from './user/repository'
