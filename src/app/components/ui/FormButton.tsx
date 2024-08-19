"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const FormButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn btn-secondary inline-flex max-w-[150px] items-center"
      type="submit"
    >
      {pending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default FormButton;
