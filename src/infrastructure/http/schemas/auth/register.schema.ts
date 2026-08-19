import z from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .nonempty("Name is required"),
  email: z.email("Email is invalid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;
