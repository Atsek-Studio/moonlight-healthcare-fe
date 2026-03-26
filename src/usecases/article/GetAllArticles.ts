import type { Article } from "../../domain/entities";
import type { ArticleRepository } from "../../domain/repositories";

export class GetAllArticles {
  constructor(private repository: ArticleRepository) {}

  execute(): Article[] {
    return this.repository.getAll();
  }
}
