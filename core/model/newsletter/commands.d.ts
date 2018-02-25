import { TypeOf } from 'io-ts'
import { commands } from './commands.io'

// io-ts command types => typescript types
export type CreateNewsletter = TypeOf<typeof commands.CreateNewsletter>
export type DefineNewsletterSettings = TypeOf<typeof commands.DefineNewsletterSettings>
export type DefineNewsletterMetadata = TypeOf<typeof commands.DefineNewsletterMetadata>
export type InviteNewsletterEditor = TypeOf<typeof commands.InviteNewsletterEditor>
export type ConfirmNewsletterEditorInvitation = TypeOf<typeof commands.ConfirmNewsletterEditorInvitation>
export type RemoveNewsletterEditor = TypeOf<typeof commands.RemoveNewsletterEditor>
export type AddUserToNewsletterGroup = TypeOf<typeof commands.AddUserToNewsletterGroup>
export type RemoveUserFromNewsletterGroup = TypeOf<typeof commands.RemoveUserFromNewsletterGroup>
export type CreateNewsletterIssue = TypeOf<typeof commands.CreateNewsletterIssue>
export type UpdateNewsletterIssue = TypeOf<typeof commands.UpdateNewsletterIssue>
export type PublishNewsletterIssue = TypeOf<typeof commands.PublishNewsletterIssue>
export type CancelSendingNewsletterIssue = TypeOf<typeof commands.CancelSendingNewsletterIssue>
export type RateReviewers = TypeOf<typeof commands.RateReviewers>
export type CreateProposal = TypeOf<typeof commands.CreateProposal>
export type WithdrawProposal = TypeOf<typeof commands.WithdrawProposal>
export type ResolveProposal = TypeOf<typeof commands.ResolveProposal>