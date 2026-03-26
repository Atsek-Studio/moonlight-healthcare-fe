import { useMemo } from "react";
import { getAllPractitioners } from "../../di/container";
import type { Practitioner } from "../../domain/entities";

export function useAllPractitioners(): Practitioner[] {
  return useMemo(() => getAllPractitioners.execute(), []);
}
