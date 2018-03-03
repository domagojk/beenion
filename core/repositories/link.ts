import { Link } from '../model/link'

export type LinkRepository = {
  get: (id: string) => Promise<Link>
  save: (id: string, doc: Link, type: LinkEventType) => Promise<Link>
  update: (id: string, doc: any, type: LinkEventType) => Promise<Link>
  delete: (id: string, type: LinkEventType) => Promise<Link>
}

export type LinkEventType =
  | 'LINK_CREATED'
  | 'LINK_METADATA_UPDATED'
  | 'LINK_DELETED'
  | 'LINK_REVIEWERS_ASSIGNED'
  | 'LINK_REVIEWED'
