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
import SmallGameCard from "../components/ui/SmallGameCard";

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
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-2xl">
      <h1 className="text-4xl">
        Hello, <span className="text-primary">{session?.user.name}</span>
      </h1>
      <h3 className="text-center">Take a look at your comments below 😉</h3>

      {/* Comment Section */}
      <div className="flex flex-wrap justify-center">
        {comments.status === 200 ? (
          comments.data?.comments.map((comment) => (
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
        ) : (
          <h3 className="text-center">No Comments Yet</h3>
        )}
      </div>

      {/* Favorite Section  WIP*/}
      <div>
        <h3 className="text-center text-lg font-bold text-primary md:text-3xl lg:text-4xl">
          Favorite Games
        </h3>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {/* <div className="group relative h-52 w-32 overflow-hidden rounded-md group-hover:scale-50">
          <h3 className="absolute right-0 top-2 z-20 w-fit origin-right scale-x-0 rounded-l-full bg-primary px-2 text-xs font-bold text-primary-content duration-300 ease-in-out group-hover:scale-x-100">
            {favorites.data.favoriteGames[0].gameName}
          </h3>
          <div className="absolute top-0 z-10 h-full w-full origin-top bg-gray-500 opacity-0 duration-300 ease-in-out group-hover:opacity-50"></div>
          <Image
            alt="Game Thumbnail"
            src={favorites.data.favoriteGames[0].gameThumbnail}
            fill
            className="object-fill"
          />
        </div> */}
        {favorites.status === 200
          ? favorites.data.favoriteGames.map((favorite) => (
              <div
                key={favorite.id}
                className="group relative h-52 w-32 overflow-hidden rounded-md group-hover:scale-50"
              >
                <h3 className="absolute right-0 top-2 z-20 w-fit origin-right scale-x-0 rounded-l-full bg-primary px-2 text-xs font-bold text-primary-content duration-300 ease-in-out group-hover:scale-x-100">
                  {favorite.gameName}
                </h3>
                <div className="absolute top-0 z-10 h-full w-full origin-top bg-gray-500 opacity-0 duration-300 ease-in-out group-hover:opacity-50"></div>
                <Image
                  alt="Game Thumbnail"
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
