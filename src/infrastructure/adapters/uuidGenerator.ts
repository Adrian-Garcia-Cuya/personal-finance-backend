import { v4 as uuidv4 } from "uuid";
import type { IdGenerator } from "@/application/ports/idGenerator";

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return uuidv4();
  }
}
