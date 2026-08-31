import type { AccountType } from "@/domain/entities";

export interface CreateAccountDTO {
  name: string;
  userId: number;
  accountType: AccountType;
  initialBalance: number;
  icon: string;
  description?: string | null;
  color?: string | null;
}
