import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import CommentForm from "./forms/CommentForm";
import prisma from "../lib/prisma";
import BubbleChat from "./BubbleChat";

const GameCommentSection = async ({ gameId }: { gameId: string }) => {
  const session = await getServerSession(authOptions);

  //Get Comments
  const comments = await prisma.comment.findMany({
    where: {
      gameId: gameId,
    },
    select: {
      id: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  console.log(comments);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-primary md:text-4xl">Comments</h1>
      <h1 className="text-center text-lg font-bold text-secondary md:text-2xl">
        Bagikan Pendapatmu
      </h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <CommentForm gameId={gameId} userId={session?.user.id} />
      </div>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="max-w-md" key={comment.id}>
              <BubbleChat
                comment={comment.comment}
                name={comment.user.name as string}
                commentDate={comment.createdAt.toLocaleDateString()}
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
