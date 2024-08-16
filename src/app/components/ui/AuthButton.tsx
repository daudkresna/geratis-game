"use client";

import { signIn, signOut } from "next-auth/react";
import React from "react";

export const SignInButton = () => {
  return (
    <button className="btn" onClick={() => signIn()}>
      Sign In
    </button>
  );
};

export const SignOutButton = () => {
  return (
    <button className="btn" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};
