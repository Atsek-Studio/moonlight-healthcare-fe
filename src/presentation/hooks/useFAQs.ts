import { useMemo } from "react";
import { getAllFAQs, searchFAQs } from "../../di/container";
import type { FAQ } from "../../domain/entities";

export function useAllFAQs(): FAQ[] {
  return useMemo(() => getAllFAQs.execute(), []);
}

export function useSearchFAQs(searchTerm: string): FAQ[] {
  return useMemo(() => searchFAQs.execute(searchTerm), [searchTerm]);
}
