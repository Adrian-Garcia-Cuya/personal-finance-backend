import type { AccountEntity } from "@/domain/entities/account/account.entity";
import type { CategoryEntity } from "@/domain/entities/category/category.entity";
import type { TagEntity } from "@/domain/entities/tag.entity";

export interface RegistrationFormDataDTO {
  categories: CategoryEntity[];
  accounts: AccountEntity[];
  tags: TagEntity[];
}
