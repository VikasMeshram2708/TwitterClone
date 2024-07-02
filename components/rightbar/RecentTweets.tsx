"use client";

// import { SampleTweets } from "@/seed/SampleTweets";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ExternalLink,
  Heart,
  Pencil,
  Share,
  Share2,
  Trash2,
} from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0/client";
import toast from "react-hot-toast";

interface iTweet {
  id: string;
  author: string;
  content: string;
  liked: boolean;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
}

export default function RecentTweets() {
  const { user } = useUser();

  const [allTweets, setAllTweets] = useState<iTweet[]>([]);
  const query = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["tweet"],
    queryFn: async () => {
      const response = await fetch("/api/readall");
      const data = await response.json();
      setAllTweets(data?.data);
    },
    onError: () => {
      return "failed to fetch the tweets.";
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (tweetMsgId: string) => {
      // check if the user is authorized or not
      // is not authorized don't show the delete and edit icon
      const response = await fetch("/api/deletetweet", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tweetId: tweetMsgId }),
      });
      const result = await response.json();
      console.log(result);
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["tweet"],
      });
      toast.success("tweet deleted");
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (tweetMsgId: string) => {
      if (!user) {
        toast.error("Login first.");
        Promise.resolve();
      }

      const response = await fetch("/api/liketweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweetId: tweetMsgId,
          liked: true,
        }),
      });
      const result = await response.json();
      // console.log(result);
      // console.log("tweet liked", tweetMsgId);
    },
    onSuccess: () => {
      query.invalidateQueries(["tweet"]);
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async (tweetMsgId: string) => {
      if (!user) {
        toast.error("Login first.");
        Promise.resolve();
      }

      const response = await fetch("/api/liketweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweetId: tweetMsgId,
          liked: false,
        }),
      });
      const result = await response.json();
    },
    onSuccess: () => {
      query.invalidateQueries(["tweet"]);
    },
  });

  return (
    <section className="bg-slate-800 p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Recent Tweets</h2>
      <ul className="space-y-4 overflow-y-auto">
        {isLoading ? (
          <h1 className="text-white text-3xl font-semibold text-center">
            Loading...
          </h1>
        ) : (
          allTweets?.map((tweet) => (
            <li
              key={tweet.id}
              className="bg-slate-700 rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
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
                {user && user?.name === tweet?.author ? (
                  <div className="flex items-center gap-3">
                    <Trash2
                      onClick={() => deleteMutation.mutate(tweet?.id)}
                      size={24}
                      color="red"
                      className="cursor-pointer"
                    />
                    <Pencil
                      size={24}
                      color="white"
                      className="cursor-pointer"
                    />
                    {/* <ExternalLink color="white" /> */}
                  </div>
                ) : (
                  <>
                    {tweet?.liked ? (
                      <div className="flex items-center gap-2">
                        <Heart
                          onClick={() => dislikeMutation.mutate(tweet?.id)}
                          fill="red"
                          color="white"
                        />
                        {/* <ExternalLink color="white" /> */}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Heart
                          onClick={() => {
                            likeMutation.mutate(tweet?.id);
                          }}
                          color="white"
                        />
                        {/* <ExternalLink color="white" /> */}
                      </div>
                    )}
                  </>
                )}
              </div>
              <p className="text-white">{tweet.content}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
