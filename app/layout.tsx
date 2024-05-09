import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageWrapper from "@/components/PageWrapper";
import PageProps from "@/components/PageProps";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "This application is a clone of twitter.",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white font-Poppins">
        <PageWrapper>
          <PageProps />
        </PageWrapper>
      </body>
    </html>
  );
}
