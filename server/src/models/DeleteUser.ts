import * as z from "zod";

export const DeleteUserSchema = z.object({
  email: z.string().email(),
});

export type DeleteUserSchemaType = z.infer<typeof DeleteUserSchema>;
