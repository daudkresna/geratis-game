"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef } from "react";
import FormButton from "../ui/FormButton";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { revalidateSignIn } from "@/app/actions/action";

const SignInForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSignIn = async (formData: FormData) => {
    formRef.current?.reset();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      toast.error("Incorrect email or password");
    } else {
      toast.success("Sign in successful");
      revalidateSignIn();
      redirect("/");
    }
  };
  return (
    <div className="rounded-md bg-secondary p-16 shadow">
      <h1 className="text-secondary-content-content mb-4 text-center text-3xl font-bold">
        SIGN IN
      </h1>
      <form action={handleSignIn} className="flex flex-col gap-4" ref={formRef}>
        <input
          type="text"
          name="email"
          placeholder="email"
          className="rounded-sm bg-secondary-content px-4 py-2 text-white"
        />
        <input
          type="password"
          name="password"
          className="rounded-sm bg-secondary-content px-4 py-2 text-white"
        />
        <div className="flex justify-center">
          <FormButton>Sign In</FormButton>
        </div>
      </form>
      <div className="mt-4 text-center">
        <Link href="/signup" className="group w-full">
          New here?{" "}
          <span className="duration-300 ease-in-out group-hover:underline">
            {" "}
            Sign up here{" "}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
