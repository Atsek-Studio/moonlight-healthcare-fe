import type { Service } from "../../domain/entities";
import type { ServiceRepository } from "../../domain/repositories";

export class GetAllServices {
  constructor(private repository: ServiceRepository) {}

  execute(): Service[] {
    return this.repository.getAll();
  }
}
