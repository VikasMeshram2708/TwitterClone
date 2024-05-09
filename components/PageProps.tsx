import Link from "next/link";
import Sidebar from "./Sidebar";
import TweetBody from "./TweetBody";
import AdsSideBar from "./AdsSideBar";

export default function PageProps() {
  return (
    <section className="min-h-screen container mx-auto">
      <div className="flex items-center">
        <div className="grid">
          {/* SideBar */}
          <Sidebar />
        </div>
        <div className="">
          {/* Tweeter Body */}
          <TweetBody />
        </div>
        <div className="hidden md:block">
          {/* AdsSidebar */}
          <AdsSideBar />
        </div>
      </div>
    </section>
  );
}
