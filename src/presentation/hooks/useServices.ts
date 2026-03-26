import { useMemo } from "react";
import { getAllServices } from "../../di/container";
import type { Service } from "../../domain/entities";

export function useAllServices(): Service[] {
  return useMemo(() => getAllServices.execute(), []);
}
