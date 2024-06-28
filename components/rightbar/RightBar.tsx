import React from "react";
import { Input } from "../ui/input";
import TweetInput from "./TweetInput";
import RecentTweets from "./RecentTweets";

export default function RightBar() {
  return (
    <section className="bg-slate-900 w-full px-4 py-2 rounded-md">
      {/* TweetInput */}
      <TweetInput />
      <div className="mt-2">
        {/* RecentTWeets */}
        <RecentTweets />
      </div>
    </section>
  );
}
