import type { Service } from "../../domain/entities";
import type { ServiceRepository } from "../../domain/repositories";
import { SERVICES_DATA } from "../datasources/services.data";

export class ServiceRepositoryImpl implements ServiceRepository {
  private services: Service[] = SERVICES_DATA;

  getAll(): Service[] {
    return this.services;
  }

  getById(id: string): Service | undefined {
    return this.services.find((s) => s.id === id);
  }
}
