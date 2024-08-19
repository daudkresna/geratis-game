import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import { SignInButton, SignOutButton } from "./ui/AuthButton";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          Geratis
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal inline-flex items-center gap-x-4 px-1">
          <li>
            <Link href="/search">Search</Link>
          </li>
          <li>
            <Link href="/games">Games</Link>
          </li>
          <li>{session ? <SignOutButton /> : <SignInButton />}</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
