import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import CommentForm from "./forms/CommentForm";
import BubbleChat from "./BubbleChat";
import { CommentResponse } from "../api/game/[id]/comments/route";
import { GameComments } from "../../../type";

const GameCommentSection = async ({
  gameId,
  gameName,
}: {
  gameId: string;
  gameName: string;
}) => {
  const session = await getServerSession(authOptions);

  //Get Comments
  const res = await fetch(`${process.env.BASE_URL}/game/${gameId}/comments`, {
    next: { tags: ["comment"] },
  });
  const comments: CommentResponse = await res.json();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-primary md:text-4xl">Comments</h1>
      <h1 className="text-center text-lg font-bold text-secondary md:text-2xl">
        Bagikan Pendapatmu
      </h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <CommentForm
          gameId={gameId}
          userId={session?.user.id}
          gameName={gameName}
        />
      </div>
      <div className="mb-8">
        {comments.status === 200 ? (
          comments.data.map((comment: GameComments) => (
            <div className="max-w-md" key={comment.id}>
              <BubbleChat
                comment={comment.comment}
                name={comment.user.name as string}
                commentDate={new Date(comment.createdAt).toLocaleDateString()}
                image={
                  comment.user.image
                    ? comment.user.image
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default GameCommentSection;
