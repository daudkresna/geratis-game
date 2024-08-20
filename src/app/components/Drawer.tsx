import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import authOptions from "../api/auth/[...nextauth]/options";
import { SignInButton, SignOutButton } from "./ui/AuthButton";

const Drawer = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full bg-base-100">
          <div className="mx-0 flex-1 px-0 md:mx-2 md:px-2">
            <Link href={"/"} className="btn btn-ghost text-xl">
              Geratis
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal inline-flex items-center gap-x-4 px-1">
              {/* Navbar menu content here */}
              <li>
                <Link href="/search">Search</Link>
              </li>
              <li>
                <Link href="/games">Games</Link>
              </li>
              {session && (
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
              )}
              <li>{session ? <SignOutButton /> : <SignInButton />}</li>
            </ul>
          </div>
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 bg-base-200 p-4">
          {/* Sidebar content here */}
          <li>
            <Link href="/search">Search</Link>
          </li>
          <li>
            <Link href="/games">Games</Link>
          </li>
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          <li>{session ? <SignOutButton /> : <SignInButton />}</li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
