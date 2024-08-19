"use client";
import React from "react";
import FormButton from "../ui/FormButton";
import { addCommentAction } from "@/app/actions/action";

const CommentForm = ({
  gameId,
  userId,
}: {
  gameId: string;
  userId?: string;
}) => {
  return (
    <form
      action={addCommentAction}
      className="flex flex-col items-center gap-4"
    >
      <input type="text" name="gameId" value={gameId} hidden readOnly />
      <input type="text" name="userId" value={userId} hidden readOnly />
      <textarea
        name="comment"
        placeholder="Write your comment here"
        className="textarea textarea-bordered textarea-secondary textarea-lg w-full max-w-xl"
      ></textarea>
      <FormButton>Submit</FormButton>
    </form>
  );
};

export default CommentForm;
