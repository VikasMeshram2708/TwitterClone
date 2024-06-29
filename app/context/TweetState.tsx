"use client";

import { ReactNode, useContext } from "react";
import { TweetContext } from "./TweetContext";

export const TweetState = ({ children }: { children: ReactNode }) => {
  const data = {
    name: "vikas meshram",
  };
  return (
    <TweetContext.Provider value={{ data }}>{children}</TweetContext.Provider>
  );
};

export const useTweet = () => {
  const Tweet = useContext(TweetContext);
  if (!Tweet) {
    return "useTweet must be wrapped in TweetState.";
  }
  return Tweet;
};
