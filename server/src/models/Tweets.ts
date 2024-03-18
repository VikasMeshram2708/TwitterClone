import * as z from "zod";

export const TweetsSchema = z.object({
  tweet: z
    .string()
    .min(2, {
      message: "Tweet must contain at least 2 character(s)",
    })
    .max(100, {
      message: "Tweet maximum limit is 100 character(s)",
    }),
  imageUri: z.string().url().nullish(),
});

export type TweetsSchemaType = z.infer<typeof TweetsSchema>;
