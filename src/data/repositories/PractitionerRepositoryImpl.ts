import type { Practitioner } from "../../domain/entities";
import type { PractitionerRepository } from "../../domain/repositories";
import { PRACTITIONERS_DATA } from "../datasources/practitioners.data";

export class PractitionerRepositoryImpl implements PractitionerRepository {
  private practitioners: Practitioner[] = PRACTITIONERS_DATA;

  getAll(): Practitioner[] {
    return this.practitioners;
  }
}
