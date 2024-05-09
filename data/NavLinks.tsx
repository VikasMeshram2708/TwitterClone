import { Home, Search, User } from "lucide-react";

interface NavLink {
  id: number;
  title: string;
  redirectUrl: string;
  icon: JSX.Element;
}

export const NavLinks: NavLink[] = [
  {
    id: 1,
    title: "Home",
    redirectUrl: "/",
    icon: <Home />,
  },
  {
    id: 2,
    title: "Explore",
    redirectUrl: "/explore",
    icon: <Search />,
  },
  {
    id: 3,
    title: "Profile",
    redirectUrl: "/profile",
    icon: <User />,
  },
];
