import { EventUnion } from './types'

export type ArticleEvents = {
  ARTICLE_CREATED: {
    articleId: string
    newsletterId: string
    userId: string
  }
  ARTICLE_DELETED: {
    articleId: string
    userId: string
  }
  ARTICLE_DESCRIPTION_UPDATED: {
    articleId: string
    userId: string
    description: string
  }
}

export type ArticleEvent = EventUnion<ArticleEvents>