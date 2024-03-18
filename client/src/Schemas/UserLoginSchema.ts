import z from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Password must be minimum 5 characters long.",
    })
    .max(100, {
      message: "Password maximum limit is 100 characters.",
    }),
});

export type UserLoginSchemaType = z.infer<typeof UserLoginSchema>;
