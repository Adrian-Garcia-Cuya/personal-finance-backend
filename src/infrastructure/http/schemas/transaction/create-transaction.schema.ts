import { TransactionType } from "@/domain/entities/transaction/types";
import z from "zod";

export const CreateTransactionSchema = z.object({
  accountId: z.uuid(),
  amount: z.number().positive("Amount must be greater than zero"),
  type: z.enum(TransactionType),
  transactionDate: z.iso.datetime({ offset: true }).transform((value) => new Date(value)),
  categoryId: z.uuid().nullish(),
  toAccountId: z.uuid().nullish(),
  description: z.string().nullish(),
}).superRefine((data, ctx) => {
  if (data.type === TransactionType.TRANSFER) {
    if (!data.toAccountId) {
      ctx.addIssue({
        code: "custom",
        path: ["toAccountId"],
        message: "Destination account is required for transfers",
      });
    } else if (data.toAccountId === data.accountId) {
      ctx.addIssue({
        code: "custom",
        path: ["toAccountId"],
        message: "Destination account must differ from source account",
      });
    }
  } else if (data.toAccountId) {
    ctx.addIssue({
      code: "custom",
      path: ["toAccountId"],
      message: "Destination account is only allowed for transfers",
    });
  }
});

export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;
