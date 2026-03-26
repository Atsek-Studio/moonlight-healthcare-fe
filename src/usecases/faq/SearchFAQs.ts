import type { FAQ } from "../../domain/entities";
import type { FAQRepository } from "../../domain/repositories";

export class SearchFAQs {
  constructor(private repository: FAQRepository) {}

  execute(searchTerm: string): FAQ[] {
    const all = this.repository.getAll();
    if (!searchTerm) return all;

    const term = searchTerm.toLowerCase();
    return all.filter(
      (faq) =>
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term),
    );
  }
}
