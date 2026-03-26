import type { FAQ } from "../../domain/entities";
import type { FAQRepository } from "../../domain/repositories";
import { FAQS_DATA } from "../datasources/faqs.data";

export class FAQRepositoryImpl implements FAQRepository {
  private faqs: FAQ[] = FAQS_DATA;

  getAll(): FAQ[] {
    return this.faqs;
  }
}
