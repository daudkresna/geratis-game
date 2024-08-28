import { getServerSession } from "next-auth";
import React from "react";
import authOptions from "../api/auth/[...nextauth]/options";
import {
  CommentResponse,
  GameComments,
  UserComment,
  UserFavoritesResponse,
} from "../../../type";
import Image from "next/image";

const page = async () => {
  const session = await getServerSession(authOptions);

  const [comments, favorites]: [CommentResponse, UserFavoritesResponse] =
    await Promise.all([
      fetch(`${process.env.BASE_URL}/users/${session?.user.id}/comments`, {
        cache: "no-store",
      }).then((res) => res.json()),
      fetch(`${process.env.BASE_URL}/users/${session?.user.id}/favorites`, {
        cache: "no-store",
      }).then((res) => res.json()),
    ]);
  console.log(favorites.data.favoriteGames);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-2xl">
      <h1 className="text-4xl">
        Hello, <span className="text-primary">{session?.user.name}</span>
      </h1>
      <h3 className="text-center">Take a look at your comments below 😉</h3>

      {/* Comment Section */}
      <div className="grid grid-cols-1 items-center justify-center justify-items-center gap-4 md:grid-cols-3 lg:grid-cols-5">
        {comments.status === 200
          ? comments.data?.comments.map((comment) => (
              <div
                key={comment.id}
                className="flex flex-col gap-4 rounded-md bg-secondary p-4 text-secondary-content shadow-md"
              >
                <div className="flex flex-col justify-between">
                  <h3 className="text-xs">{comment.gameName}</h3>
                  <time className="text-xs opacity-50">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <div className="w-full truncate">
                  <h3>{comment.comment}</h3>
                </div>
              </div>
            ))
          : "No comments yet :("}
      </div>

      {/* Favorite Section  WIP*/}
      <div>
        <h3 className="text-center text-lg font-bold text-primary md:text-3xl lg:text-4xl">
          Favorite Games
        </h3>
      </div>
      <div className="grid w-full grid-cols-5 items-center justify-center justify-items-center">
        {favorites.status === 200
          ? favorites.data.favoriteGames.map((favorite) => (
              <div key={favorite.id} className="relative h-52 w-32">
                <Image
                  alt={favorite.gameName}
                  src={favorite.gameThumbnail}
                  fill
                  className="object-fill"
                />
              </div>
            ))
          : "No favorite games yet :("}
      </div>
    </div>
  );
};

export default page;
