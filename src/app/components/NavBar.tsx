import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          Geratis
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/search">Search</Link>
          </li>
          <li>
            <Link href="/games">Games</Link>
          </li>
          <li>
            <Link href="/signin">Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
