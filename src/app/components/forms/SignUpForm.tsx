"use client";
import { revalidateSignIn, signUpAction } from "@/app/actions/action";
import React, { useState } from "react";
import FormButton from "../ui/FormButton";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleAction = async (formData: FormData) => {
    const success = await signUpAction(formData);

    if (!success?.success) {
      setErrorMessage(success.message);
      return toast.error("Account creation failed");
    } else {
      toast.success("Account created successfully");
      redirect("/signin");
    }
  };
  return (
    <div className="rounded-md bg-secondary p-16 shadow">
      <h1 className="text-secondary-content-content mb-4 text-center text-3xl font-bold">
        SIGN UP
      </h1>
      <form action={handleAction} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="your-name"
          className="rounded-sm bg-secondary-content px-4 py-2 text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="your-email"
          className="rounded-sm bg-secondary-content px-4 py-2 text-white"
        />
        <input
          type="password"
          name="password"
          className="rounded-sm bg-secondary-content px-4 py-2 text-white"
        />
        <div className="flex justify-center">
          <FormButton>Sign Up</FormButton>
        </div>
        <pre>{errorMessage}</pre>
      </form>
    </div>
  );
};

export default SignUpForm;
