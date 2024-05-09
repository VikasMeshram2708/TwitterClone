import React from "react";
import { UserAvatar } from "./UserAvatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { BarChart, Dot, ExternalLink, Heart } from "lucide-react";
import Image from "next/image";

export default function TweetPost() {
  return (
    <Card className="bg-transparent text-white">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-4">
          <UserAvatar />
          <div>
            <CardTitle>Vikas Meshram</CardTitle>
            <CardDescription className="flex items-center gap-1 text-gray-500">
              <span>@vikas</span>
              <Dot className="w-2 h-2" />
              <span>1h</span>
            </CardDescription>
          </div>
        </div>
        <button className="text-2xl font-semibold">...</button>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus ad
          assumenda cupiditate natus, quasi error, necessitatibus eos sed
          veritatis quia excepturi odit aspernatur totam quos.
        </p>
        <Image
          src="https://is.gd/TUlLJgN"
          width={500}
          height={500}
          className="bg-contain w-full h-auto rounded-md"
          alt="example"
        />
      </CardContent>
      <CardFooter className="flex items-center gap-5">
        <Heart />
        <ExternalLink />
        <BarChart />
      </CardFooter>
    </Card>
  );
}
