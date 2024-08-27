import { getServerSession } from "next-auth";
import React from "react";
import authOptions from "../api/auth/[...nextauth]/options";
import BubbleChat from "../components/BubbleChat";
import { CommentResponse, GameComments } from "../../../type";

const page = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.BASE_URL}/users/${session?.user.id}/comments`,
    {
      cache: "no-store",
    },
  );
  const userComments: CommentResponse = await res.json();
  console.log(userComments);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-2xl">
      <h1 className="text-4xl">
        Hello, <span className="text-primary">{session?.user.name}</span>
      </h1>
      <h3 className="text-center">Take a look at your comments below 😉</h3>
      {userComments.status === 200
        ? userComments.data?.comments.map((comment: any) => (
            <div className="max-w-md" key={comment.id}>
              <BubbleChat
                comment={comment.comment}
                name={userComments.data?.name as string}
                commentDate={new Date(comment.createdAt).toLocaleDateString()}
                image={
                  userComments.data?.image
                    ? comment.user.image
                    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          ))
        : "No comments yet :("}
    </div>
  );
};

export default page;
