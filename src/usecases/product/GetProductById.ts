import type { Product } from "../../domain/entities";
import type { ProductRepository } from "../../domain/repositories";

export class GetProductById {
  constructor(private repository: ProductRepository) {}

  execute(id: string): Product | undefined {
    return this.repository.getById(id);
  }
}
