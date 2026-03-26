import type { Product } from "../../domain/entities";
import type { ProductRepository } from "../../domain/repositories";

export class FilterProducts {
  constructor(private repository: ProductRepository) {}

  execute(category: string, searchQuery: string): Product[] {
    const all = this.repository.getAll();
    return all.filter((p) => {
      const matchesCategory = category === "Tất cả" || p.category === category;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }
}
