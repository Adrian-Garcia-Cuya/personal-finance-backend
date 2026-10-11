import { CategoryType } from "@/domain/entities";
import z from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(CategoryType, {
    error: () => ({ message: "Invalid category type" }),
  }),
  icon: z.string().min(1, "Icon is required"),
  parentId: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
