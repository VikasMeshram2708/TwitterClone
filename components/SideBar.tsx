import { Bookmark, Contact, Home, Store } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function SideBar() {
  return (
    <section className="min-h-screen bg-slate-800 text-white w-full max-w-[20rem] flex flex-col">
      <h1 className="text-white text-3xl font-bold text-center pt-14">
        Twitter
      </h1>
      <div className="container flex flex-col flex-grow">
        <ul className="mt-10 flex flex-col gap-5">
          <li className="hover:bg-slate-950 cursor-pointer flex items-center gap-3 px-4 py-2 rounded">
            <Home />
            Home
          </li>
          <li className="hover:bg-slate-950 cursor-pointer flex items-center gap-3 px-4 py-2 rounded">
            <Bookmark />
            Bookmark
          </li>
          <li className="hover:bg-slate-950 cursor-pointer flex items-center gap-3 px-4 py-2 rounded">
            <Store />
            Store
          </li>
          <li className="hover:bg-slate-950 cursor-pointer flex items-center gap-3 px-4 py-2 rounded">
            <Contact />
            Contact
          </li>
        </ul>
        <div className="mt-auto mb-6">
          <Button variant="secondary" className="w-full">
            Login
          </Button>
        </div>
      </div>
    </section>
  );
}
