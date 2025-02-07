import z from 'zod'

export const loginSchema = z
  .object({
    email: z.string().email('Invalid email address!').trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters!')
      .trim()
  })
  .strict()

export type LoginSchemaType = z.infer<typeof loginSchema>
