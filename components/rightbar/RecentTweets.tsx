"use client";

// import { SampleTweets } from "@/seed/SampleTweets";
import React, { useState } from "react";
import { useQuery } from "react-query";

interface iTweet {
  id: string;
  author: string;
  content: string;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
}

export default function RecentTweets() {
  const [allTweets, setAllTweets] = useState<iTweet[]>([]);

  const { data } = useQuery({
    queryKey: ["tweet"],
    queryFn: async () => {
      const response = await fetch("/api/readall");
      const data = await response.json();
      setAllTweets(data?.data);
      console.log(data?.data);
    },
    onError: () => {
      return "failed to fetch the tweets.";
    },
  });

  return (
    <section className="bg-slate-800 p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Recent Tweets</h2>
      <ul className="space-y-4 overflow-y-auto">
        {allTweets?.map((tweet) => (
          <li key={tweet.id} className="bg-slate-700 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                {tweet.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-white font-semibold">{tweet.author}</h3>
                <p className="text-slate-400 text-sm">
                  {new Date("2024-06-28T09:15:00Z").toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
            <p className="text-white">{tweet.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
