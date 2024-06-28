/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function TweetInput() {
  return (
    <section className="bg-slate-800 p-5 overflow-y-auto sticky top-0">
      <h1 className="text-2xl font-semibold mb-4 text-white">What's in your mind</h1>
      <Input type="text" placeholder="enter your message here..." />
      <Button className="mt-5" variant={"outline"}>Send</Button>
    </section>
  );
}
