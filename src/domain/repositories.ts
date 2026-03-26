import type { Product, Article, Service, Practitioner, FAQ } from "./entities";

export interface ProductRepository {
  getAll(): Product[];
  getById(id: string): Product | undefined;
  getCategories(): string[];
}

export interface ArticleRepository {
  getAll(): Article[];
  getFeatured(): Article[];
}

export interface ServiceRepository {
  getAll(): Service[];
  getById(id: string): Service | undefined;
}

export interface PractitionerRepository {
  getAll(): Practitioner[];
}

export interface FAQRepository {
  getAll(): FAQ[];
}
