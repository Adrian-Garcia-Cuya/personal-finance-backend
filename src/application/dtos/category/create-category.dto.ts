import type { CreateCategoryDTO as CreateCategoryInput } from "@/domain/dtos/category/create-category.dto";

export type CreateCategoryDTO = Omit<CreateCategoryInput, "userId">;
