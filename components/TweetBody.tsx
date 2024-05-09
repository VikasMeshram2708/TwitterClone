import { Image, Smile } from "lucide-react";
import React from "react";
import TweetPost from "./TweetPost";

export default function TweetBody() {
  return (
    <section className="min-h-screen p-2 max-w-2xl mx-auto">
      <div className="border-2 p-2">
        <input
        placeholder="what's happening?!"
          type="text"
          className="px-4 py-2 bg-transparent text-lg w-full outline-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image />
            <Smile />
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 float-right"
          >
            Post
          </button>
        </div>
      </div>
      {/* Tweet Post */}
      <TweetPost />
      {/* TweetBody */}
    </section>
  );
}
