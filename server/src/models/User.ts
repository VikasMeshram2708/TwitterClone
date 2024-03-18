import * as z from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must contain at least 2 character(s)",
    })
    .max(100, {
      message: "Name maximum limit is 100 character(s)",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Password must contain at least 2 character(s)",
    })
    .max(100, {
      message: "Password maximum limit is 100 character(s)",
    }),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
