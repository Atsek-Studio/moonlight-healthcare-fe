import type { Product } from "../../domain/entities";
import type { ProductRepository } from "../../domain/repositories";
import { PRODUCTS_DATA } from "../datasources/products.data";

export class ProductRepositoryImpl implements ProductRepository {
  private products: Product[] = PRODUCTS_DATA;

  getAll(): Product[] {
    return this.products;
  }

  getById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getCategories(): string[] {
    return [...new Set(this.products.map((p) => p.category))];
  }
}
