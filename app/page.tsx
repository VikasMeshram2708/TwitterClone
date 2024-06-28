import SideBar from "@/components/SideBar";
import RightBar from "@/components/rightbar/RightBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="flex">
        <SideBar />
        <RightBar />
      </div>
    </main>
  );
}
