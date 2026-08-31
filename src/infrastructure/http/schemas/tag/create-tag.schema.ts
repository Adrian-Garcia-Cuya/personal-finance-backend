import z from "zod";

export const CreateTagSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateTagSchema = z.infer<typeof CreateTagSchema>;
