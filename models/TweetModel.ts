import * as z from "zod";

export const TweetSchema = z.object({
  author: z.string(),
  content: z
    .string()
    .min(2, {
      message: "tweet content must be atleast 2 characters long.",
    })
    .max(500, {
      message: "tweet must not exclude more than 500 characters.",
    }),
  authorEmail: z.string().email(),
});

export type TweetSchemaType = z.infer<typeof TweetSchema>;


export const SingleTweetSchema = z.object({
  tweetMsg: z
    .string()
    .min(2, {
      message: "tweet content must be atleast 2 characters long.",
    })
    .max(500, {
      message: "tweet must not exclude more than 500 characters.",
    }),
});

export type SingleTweetSchemaType = z.infer<typeof SingleTweetSchema>;