import { AccountType } from "@/domain/entities";
import z from "zod";

export const CreateAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  accountType: z.enum(AccountType, {
    error: () => ({ message: "Invalid account type" }),
  }),
  initialBalance: z.number().min(0, "Initial balance cannot be negative"),
  icon: z.string().min(1, "Icon is required"),
  description: z.string().optional(),
  color: z.string().optional(),
});

export type CreateAccountSchema = z.infer<typeof CreateAccountSchema>;
