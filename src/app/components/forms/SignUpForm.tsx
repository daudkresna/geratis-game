"use client";
import { signUpAction } from "@/app/actions/action";
import React, { useState } from "react";
import FormButton from "../ui/FormButton";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleAction = async (formData: FormData) => {
    const success = await signUpAction(formData);
    console.log(success);

    if (!success?.success) {
      console.log("MASUK GAGAL", success);
      setErrorMessage(success.message);
      return toast.error("Account creation failed");
    } else {
      console.log("MASUK SUKSES", success);
      toast.success("Account created successfully");
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
        <FormButton>Sign Up</FormButton>
        <pre>{errorMessage}</pre>
      </form>
    </div>
  );
};

export default SignUpForm;
