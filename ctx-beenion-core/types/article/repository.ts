import { Article, ArticleEvent, ArticleId } from '../index'

export type ArticleRepository = {
  getById: (id: ArticleId) => Promise<Article>
  save: (params: {
    events: ArticleEvent[],
    id: ArticleId,
    expectedVersion: number
  }) => Promise<any>
}
