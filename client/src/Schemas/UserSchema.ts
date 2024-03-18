import z from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be minimum 2 characters long.",
    })
    .max(100, {
      message: "Name maximum limit is 100 characters.",
    }),
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

export type UserSchemaType = z.infer<typeof UserSchema>;
