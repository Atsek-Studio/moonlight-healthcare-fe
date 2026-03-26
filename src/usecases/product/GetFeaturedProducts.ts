import type { Product } from "../../domain/entities";
import type { ProductRepository } from "../../domain/repositories";

export class GetFeaturedProducts {
  constructor(private repository: ProductRepository) {}

  execute(count: number = 4): Product[] {
    return this.repository.getAll().slice(0, count);
  }
}
