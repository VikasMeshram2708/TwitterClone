"use client";

import { NavLinks } from "@/data/NavLinks";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Sidebar() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <nav className="min-h-screen w-16 md:w-80 p-2 border-r-2 flex flex-col justify-between">
      <ul className="grid gap-10 place-items-start">
        <Link href="/" className="mb-10">
          <Image
            width={500}
            height={500}
            src="https://is.gd/3xnKDd"
            alt="twitter clone"
            className="w-12 h-12"
          />
        </Link>
        {NavLinks.map((item) => (
          <li key={item.id}>
            <Link
              className="flex items-center gap-2"
              href={`${item.redirectUrl}`}
            >
              <span>{item.icon}</span>
              <span className="hidden md:block">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {authenticated ? (
          <button className="w-full bg-red-500 hover:bg-red-600 font-semibold px-4 py-2 rounded-md">
            Logout
          </button>
        ) : (
          <button className="w-full border-2 rounded-full font-semibold px-4 py-2">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
