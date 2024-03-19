import * as z from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Password must contain at least 5 character(s)",
    })
    .max(100, {
      message: "Password maximum limit is 100 character(s)",
    }),
});

export type UserLoginSchemaType = z.infer<typeof UserLoginSchema>;
