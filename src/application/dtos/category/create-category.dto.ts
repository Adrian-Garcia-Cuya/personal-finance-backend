import { CategoryType } from "@/domain/entities";

export interface CreateCategoryDTO {
  name: string;
  userId: string;
  type: CategoryType;
  icon: string;
  parentId?: string;
  description?: string;
  color?: string;
}
