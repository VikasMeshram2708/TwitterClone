/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation } from "@tanstack/react-query";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { TweetsInterface } from "../interfaces/TweetsInterface";
const BASE_URI = import.meta.env.VITE_PUBLIC_SERVER_URL;

interface Tweet {
  id: number;
  tweet: string;
}
export default function Tweets() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [editId, setEditId] = useState<number>();
  const [toggleEdit, setToggleEdit] = useState(false);
  const userId = localStorage.getItem("CurrentUserId");
  const [myTweets, setMyTweets] = useState<TweetsInterface[]>([])

  // @ts-ignore
  const parsedUserId = JSON.parse(userId);
  // Add Tweet
  const handleTweet = async () => {
    const tweetData = {
      tweet: tweet,
      id: parsedUserId,
    };
    console.log("tweeted: ", tweetData);

    if (toggleEdit && editId !== undefined) {
      setTweets((prevTweets) => {
        return prevTweets.map((d) =>
          d.id === editId ? { ...d, tweet: tweet } : d
        );
      });
      setToggleEdit(false);
      toast.success("Tweet Updated.");
    } else {
      const response = await fetch(`${BASE_URI}/api/create-tweet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tweetData),
      });
      const result = await response.json();
      if (!response.ok) {
        return toast.error(result?.message);
      }
      // toast.success(result?.message);
      setTweets((prev) => [
        ...prev,
        {
          id: Math.floor(1000 + Math.random() * 1000),
          tweet: tweet,
        },
      ]);
      toast.success("Tweet posted");
      Promise.resolve();
    }
  };

  // Delete Tweets
  const handleDelete = (tweetId: number) => {
    setTweets(tweets?.filter((d) => d.id !== tweetId));
    return toast.success("Tweet Removed.");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate();
    setTweet("");
  };

  // Muatation Function
  const { reset, mutate } = useMutation({
    mutationKey: ["tweets"],
    mutationFn: handleTweet,
    onSuccess: () => {
      reset();
    },
  });

  const handleEdit = (tweetId: number) => {
    setEditId(tweetId);
    setToggleEdit(true);
    const actualTweet = tweets?.find((d) => d.id === tweetId);
    setTweet(actualTweet?.tweet as string);
  };

  // Retrieve all tweets
  const RetrieveAllTweets = useCallback(async () => {
    const response = await fetch(
      `${BASE_URI}/api/getAllTweets/${parsedUserId}`
    );
    const result = await response.json();
    console.log(result.data.tweets);
    setMyTweets(result.data.tweets);
  }, [parsedUserId]);

  useEffect(() => {
    RetrieveAllTweets();
  }, [RetrieveAllTweets]);

  return (
    <section className="min-h-screen">
      <h1 className="text-center text-4xl mt-10">Tweet</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto form-control grid gap-3 mt-10"
      >
        <input
          value={tweet}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTweet(e.target.value)
          }
          type="text"
          placeholder="Enter your Tweet"
          className="p-3 outline-none rounded border-[--acc] border-2"
        />
        <div>
          <button
            type="submit"
            className="rounded-md px-4 py-2 bg-[--acc] text-black font-semibold"
          >
            {toggleEdit ? "Save Edit" : "Tweet"}
          </button>
        </div>
      </form>
      <ul className="max-w-7xl mt-10 mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {myTweets?.map((tweet) => (
          <div
            key={tweet?.id}
            className="flex items-center justify-between p-2 rounded-md  border-2 border-[--acc]"
          >
            <li className="text-[1.2rem]">{tweet.tweet}</li>
            <div className="flex items-center gap-5">
              <FaRegEdit
                onClick={() => handleEdit(tweet?.id)}
                className="cursor-pointer"
                size={25}
                color="red"
              />
              <FaDeleteLeft
                onClick={() => handleDelete(tweet?.id)}
                className="cursor-pointer"
                size={25}
                color="red"
              />
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
}
