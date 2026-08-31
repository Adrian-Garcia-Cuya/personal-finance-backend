import type { CreateTagDTO as CreateTagInput } from "@/domain/dtos/tag/create-tag.dto";

export type CreateTagDTO = Omit<CreateTagInput, "userId">;
