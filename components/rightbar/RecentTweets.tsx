'use client'

import { useTweet } from "@/app/context/TweetState";
import { SampleTweets } from "@/seed/SampleTweets";
import React from "react";

export default function RecentTweets() {
  // @ts-ignore
  const { data } = useTweet();
  return (
    <section className="bg-slate-800 p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Recent Tweets</h2>
      <ul className="space-y-4 overflow-y-auto">
        {SampleTweets?.slice(0, 5).map((tweet) => (
          <li key={tweet.id} className="bg-slate-700 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                {tweet.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-white font-semibold">{tweet.author}</h3>
                <p className="text-slate-400 text-sm">{tweet?.createdAt}</p>
              </div>
            </div>
            <p className="text-white">{tweet.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
