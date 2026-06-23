import * as z from "zod";

const passwordSchema = z
  .string()
  .min(8)
  .refine((val) => /[A-Z]/.test(val), {
    message: "Must contain an uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Must contain a lowercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Must contain a number",
  })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: "Must contain a special character",
  });

export const RegisterUserSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.email(),
  password: passwordSchema,
});

export const LoginUserSchema = z.object({
    email: z.email(),
    password: passwordSchema,
})

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>
export type LoginUserInput = z.infer<typeof LoginUserSchema>