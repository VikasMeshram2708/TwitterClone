import { NavLinks } from "@/data/NavLinks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <nav className="min-h-screen w-16 md:w-80 p-2 border-r-2">
      <ul className="grid gap-5 place-content-center">
        <Image width={500} height={500} src="https://is.gd/3xnKDd" alt="twitter clone" className="w-12 h-12" />
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
    </nav>
  );
}