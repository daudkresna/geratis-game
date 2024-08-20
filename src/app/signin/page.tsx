import { getServerSession } from "next-auth";
import React from "react";
import authOptions from "../api/auth/[...nextauth]/options";
import SignInForm from "../components/forms/SignInForm";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-calc(100vh-4rem) flex items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default page;
