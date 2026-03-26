import type { Practitioner } from "../../domain/entities";
import type { PractitionerRepository } from "../../domain/repositories";

export class GetAllPractitioners {
  constructor(private repository: PractitionerRepository) {}

  execute(): Practitioner[] {
    return this.repository.getAll();
  }
}
