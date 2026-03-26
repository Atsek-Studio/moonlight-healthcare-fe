import type { Product } from "../../domain/entities";
import type { ProductRepository } from "../../domain/repositories";

export class GetAllProducts {
  constructor(private repository: ProductRepository) {}

  execute(): Product[] {
    return this.repository.getAll();
  }
}
