import { useMemo } from "react";
import {
  getAllProducts,
  getProductById,
  filterProducts,
  getProductCategories,
  getFeaturedProducts,
} from "../../di/container";
import type { Product } from "../../domain/entities";

export function useAllProducts(): Product[] {
  return useMemo(() => getAllProducts.execute(), []);
}

export function useProductById(id: string): Product | undefined {
  return useMemo(() => getProductById.execute(id), [id]);
}

export function useFilteredProducts(
  category: string,
  searchQuery: string,
): Product[] {
  return useMemo(
    () => filterProducts.execute(category, searchQuery),
    [category, searchQuery],
  );
}

export function useProductCategories(): string[] {
  return useMemo(() => getProductCategories.execute(), []);
}

export function useFeaturedProducts(count: number = 4): Product[] {
  return useMemo(() => getFeaturedProducts.execute(count), [count]);
}
