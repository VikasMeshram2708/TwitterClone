"use client";
import { ReactNode, useContext } from "react";
import { TweetContext } from "./TweetContext";
import { SingleTweetSchema } from "@/models/TweetModel";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ZodError } from "zod";

export const TweetState = ({ children }: { children: ReactNode }) => {
  const data = {
    name: "vikas",
  };

  return (
    <TweetContext.Provider value={{ data }}>{children}</TweetContext.Provider>
  );
};

export const useTweet = () => {
  const context = useContext(TweetContext);
  if (!context) {
    throw new Error("useTweet must be used within a TweetState provider");
  }
  return context;
};
