import { useMemo } from "react";
import { getAllServices, getServiceById } from "../../di/container";
import type { Service } from "../../domain/entities";

export function useAllServices(): Service[] {
  return useMemo(() => getAllServices.execute(), []);
}

export function useServiceById(id: string): Service | undefined {
  return useMemo(() => getServiceById.execute(id), [id]);
}
