"use client";
import React, { useRef } from "react";
import FormButton from "../ui/FormButton";
import { addCommentAction } from "@/app/actions/action";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

const CommentForm = ({
  gameId,
  userId,
  gameName,
}: {
  gameId: string;
  userId?: string;
  gameName: string;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleAction = async (formData: FormData) => {
    const newComment = await addCommentAction(formData);
    if (newComment) {
      toast.success("Comment added successfully");
    }
    formRef.current?.reset();
  };
  return (
    <form
      action={handleAction}
      ref={formRef}
      className="flex flex-col items-center gap-4"
    >
      <input type="text" name="gameId" value={gameId} hidden readOnly />
      <input type="text" name="userId" value={userId} hidden readOnly />
      <input type="text" name="gameName" value={gameName} hidden readOnly />
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
