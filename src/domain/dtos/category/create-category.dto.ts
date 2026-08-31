import { CategoryType } from "@/domain/entities";

export interface CreateCategoryDTO {
  name: string;
  userId: number;
  type: CategoryType;
  icon: string;
  parentId?: number;
  description?: string;
  color?: string;
}
