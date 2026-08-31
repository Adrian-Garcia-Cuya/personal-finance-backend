import type { CreateAccountDTO as CreateAccountInput } from "@/domain/dtos/account/create-account.dto";

export type CreateAccountDTO = Omit<CreateAccountInput, "userId">;
