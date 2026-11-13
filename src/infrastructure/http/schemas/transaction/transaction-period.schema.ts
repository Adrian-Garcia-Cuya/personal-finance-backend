import z from "zod";

export const TransactionPeriodSchema = z
  .object({
    from: z.iso.date(),
    to: z.iso.date(),
  })
  .refine((period) => period.from <= period.to, {
    path: ["to"],
    message: "End date must be on or after start date",
  });
