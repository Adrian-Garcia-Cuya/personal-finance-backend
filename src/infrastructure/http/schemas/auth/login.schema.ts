import z from "zod";

export const LoginSchema = z.object({
  email: z.email("Email is invalid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
