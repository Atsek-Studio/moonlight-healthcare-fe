import type { ProductRepository } from "../../domain/repositories";

export class GetProductCategories {
  constructor(private repository: ProductRepository) {}

  execute(): string[] {
    return ["Tất cả", ...this.repository.getCategories()];
  }
}
