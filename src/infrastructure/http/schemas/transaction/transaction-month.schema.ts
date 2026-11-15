import z from "zod";

export const TransactionMonthSchema = z.object({
  month: z.string().regex(/^(?!0000)\d{4}-(0[1-9]|1[0-2])$/, "Month must be in YYYY-MM format"),
});
