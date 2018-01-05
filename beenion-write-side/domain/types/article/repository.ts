import { Article, ArticleEvent, ArticleId } from '../index'

export type ArticleRepository = {
  getById: (id: ArticleId) => Promise<{
    articleState: Article,
    save: (events: ArticleEvent[], version?: number) => Promise<any>
  }>
  create: (id: ArticleId) => {
    save: (events: ArticleEvent[]) => Promise<any>
  }
}
