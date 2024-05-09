import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingTags } from "@/data/TrendingTags";
import Link from "next/link";

export default function Happening() {
  return (
    <section>
      <Card className="bg-transparent text-white border-2">
        <CardHeader>
          <CardTitle>What's Happening</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="">
            {TrendingTags.map((item) => (
              <div key={item.id} className="py-4">
                <li className="flex justify-between items-center hover:text-blue-500 transition-colors">
                  <div>
                    <span className="text-gray-500 font-semibold">
                      Trending
                    </span>
                    <h3 className="font-bold">#{item.title}</h3>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
