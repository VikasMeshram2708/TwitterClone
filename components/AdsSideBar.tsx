import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import PremiumSub from "./PremiumSub";
import SearchBar from "./SearchBar";
import Happening from "./Happening";

export default function AdsSideBar() {
  return (
    <section className="min-h-screen w-96 border-l-2 p-5">
      <div className="grid gap-5">
        {/* Search Bar */}
        <SearchBar />
        {/* Subscribe to premium */}
        <PremiumSub />
        {/* Whats Happening */}
        <Happening />
      </div>
    </section>
  );
}
