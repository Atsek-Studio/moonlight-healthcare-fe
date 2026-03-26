import type { FAQ } from "../../domain/entities";
import type { FAQRepository } from "../../domain/repositories";

export class GetAllFAQs {
  constructor(private repository: FAQRepository) {}

  execute(): FAQ[] {
    return this.repository.getAll();
  }
}
