import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/options";
import CommentForm from "./forms/CommentForm";
import prisma from "../lib/prisma";
import Image from "next/image";
import BubbleChat from "./BubbleChat";

const GameCommentSection = async ({ gameId }: { gameId: string }) => {
  const session = await getServerSession(authOptions);
  //   const comments = await prisma.user.findMany({
  //     select: {
  //       name: true,
  //       comments: {
  //         select: {
  //           createdAt: true,
  //           updatedAt: true,
  //           comment: true,
  //         },
  //       },
  //     },
  //   });
  const comments = await prisma.comment.findMany({
    where: {
      gameId: gameId,
    },
    select: {
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
      <h1 className="text-4xl font-bold text-primary">Comments</h1>
      <h1 className="text-center text-2xl font-bold text-secondary">
        What's your opinion?
      </h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <CommentForm gameId={gameId} userId={session?.user.id} />
      </div>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
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
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default GameCommentSection;
