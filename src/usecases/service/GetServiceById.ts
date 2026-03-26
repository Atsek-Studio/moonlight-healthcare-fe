import type { Service } from "../../domain/entities";
import type { ServiceRepository } from "../../domain/repositories";

export class GetServiceById {
  constructor(private repository: ServiceRepository) {}

  execute(id: string): Service | undefined {
    return this.repository.getById(id);
  }
}
