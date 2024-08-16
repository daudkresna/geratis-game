import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geratis Game",
  description:
    "A web app that lets users search for free PC and browser games using an external API. Explore a wide range of games easily and discover new favorites without any cost.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="retro" lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
