"use client";
/** eslint-disable react/no-unescaped-entities **/
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "react-query";

export default function TweetInput() {
  const [tweetMsg, setTweetMsg] = useState("");

  const mutation = useMutation({
    mutationFn: async (tweetInput: string) => {
      if (!tweetInput.trim()) {
        throw new Error("Tweet can't be empty!");
      }
      console.log(tweetInput);
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      setTweetMsg("");
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(tweetMsg);
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
          disabled={mutation.isLoading}
        />
        <Button 
          className="mt-5" 
          variant="outline"
          type="submit"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </section>
  );
}