import React from "react";
import FormButton from "./ui/FormButton";

const GameCommentSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-primary">Comments</h1>
      <h1 className="text-center text-2xl font-bold text-secondary">
        What's your opinion?
      </h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <form action="addCommentAction">
          <textarea
            placeholder="Write your comment here"
            className="textarea textarea-bordered textarea-secondary textarea-md w-full max-w-xs"
          ></textarea>
        </form>
        <FormButton>Submit</FormButton>
      </div>
    </div>
  );
};

export default GameCommentSection;
