import { createContext } from "react";

interface TweetProps {
  data: {
    name: string;
  };
}
export const TweetContext = createContext<TweetProps | null>(null);
