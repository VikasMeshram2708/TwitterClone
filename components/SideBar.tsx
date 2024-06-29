import { Bookmark, Contact, Home, Store } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function SideBar() {
  const session = await getSession();
  const user = session?.user;
  return (
    <section className="h-[100vh] sticky top-0 bg-slate-800 text-white w-full max-w-[20rem] flex flex-col">
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
            About Us
          </li>
          <li className="hover:bg-slate-950 cursor-pointer flex items-center gap-3 px-4 py-2 rounded">
            <Contact />
            Contact Us
          </li>
        </ul>
        <div className="mt-auto mb-6">
          {user && (
            <Button variant="destructive" className="w-full h-12">
              <Avatar>
                <AvatarImage src={user?.picture} />
                <AvatarFallback>{user?.given_name}</AvatarFallback>
              </Avatar>
              <Link href="/api/auth/logout">Logout</Link>
            </Button>
          )}
          {!user && (
            <Button variant="secondary" className="w-full">
              <Link href="/api/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
