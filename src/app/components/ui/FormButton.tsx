"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const FormButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`btn ${pending ? "btn-disabled" : "btn-primary"} inline-flex max-w-[150px] items-center justify-center`}
      type="submit"
    >
      {pending ? (
        <h3 className="inline-flex items-center gap-2">
          <span className="loading loading-spinner loading-xs"></span>
          Loading...
        </h3>
      ) : (
        children
      )}
    </button>
  );
};

export default FormButton;
