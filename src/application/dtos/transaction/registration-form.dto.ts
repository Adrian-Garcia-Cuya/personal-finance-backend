import type { AccountEntity } from "@/domain/entities/account.entity";
import type { CategoryEntity } from "@/domain/entities/category.entity";
import type { TagEntity } from "@/domain/entities/tag.entity";

export interface RegistrationFormDataDTO {
  categories: CategoryEntity[];
  accounts: AccountEntity[];
  tags: TagEntity[];
}
