import type { Article } from "../../domain/entities";
import type { ArticleRepository } from "../../domain/repositories";
import { ARTICLES_DATA } from "../datasources/articles.data";

export class ArticleRepositoryImpl implements ArticleRepository {
  private articles: Article[] = ARTICLES_DATA;

  getAll(): Article[] {
    return this.articles;
  }

  getFeatured(): Article[] {
    return this.articles.filter((a) => a.featured);
  }
}
