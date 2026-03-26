import { useMemo } from "react";
import { getAllArticles } from "../../di/container";
import type { Article } from "../../domain/entities";

export function useAllArticles(): Article[] {
  return useMemo(() => getAllArticles.execute(), []);
}
