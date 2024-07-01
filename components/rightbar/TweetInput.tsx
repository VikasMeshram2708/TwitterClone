/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function TweetInput() {
  const query = useQueryClient();

  const { user, isLoading } = useUser();

  const [tweetMsg, setTweetMsg] = useState("");

  const mutation = useMutation({
    mutationKey: ["tweet"],
    mutationFn: async () => {
      const tweetConfig = {
        author: user?.name,
        authorEmail: user?.email,
        content: tweetMsg,
      };
      const response = await fetch("/api/createtweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tweetConfig),
        cache: "no-cache",
        next: {
          revalidate: 60,
        },
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        alert(result?.message);
        console.log("Failed to tweet.");
      }
      toast.success("Tweeted");
    },
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["tweet"],
      });
      setTweetMsg("");
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!user) {
        return toast.error("Login first");
      }

      mutation.mutate();
    } catch (error) {
      console.log(`Something went wrong. Failed to tweet. ${error}`);
    }
  };

  return (
    <section className="bg-slate-800 p-5 sticky top-0">
      <h1 className="text-2xl font-semibold mb-4 text-white">
        What's in your mind
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          value={tweetMsg}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTweetMsg(e?.target?.value)
          }
          type="text"
          placeholder="enter your message here..."
          disabled={isLoading}
        />
        <Button
          className="mt-5"
          variant="outline"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "loading..." : "Send"}
        </Button>
      </form>
      <Toaster />
    </section>
  );
}
