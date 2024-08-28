import React from "react";
import { GameData } from "../../../../type";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/lib/prisma";
import Modal from "@/app/components/ui/ImageModal";
import Button from "@/app/components/ui/Button";
import { addToCollectionAction } from "@/app/actions/action";
import GameCommentSection from "@/app/components/GameCommentSection";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const gamesRes = await fetch(
    `${process.env.API_BASE_URL}/game?id=${params.id}`,
  );
  const game: GameData = await gamesRes.json();
  // const res = await fetch(
  //   `${process.env.BASE_URL}/users/${session?.user.id}/favorite?gameId=${game.id.toString()}`,
  //   {
  //     next: { tags: ["favorite"] },
  //     cache: "no-store",
  //   },
  // );
  // const isFavorite = await res.json();
  // console.log(isFavorite);

  const favorite = await prisma.favoriteGame.findMany({
    where: {
      userId: session?.user.id,
      gameId: game.id.toString(),
    },
  });
  return (
    <div className="h-screen w-full flex-col items-center justify-center px-8 md:px-16">
      {/* About Section */}
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <h1 className="text-xl font-bold text-primary md:text-4xl">
            {game.title}{" "}
            <div className="badge badge-secondary">{game.status}</div>
          </h1>
          {session && favorite.length === 0 ? (
            <Button
              title="Add To Favorite"
              gameId={game.id.toString()}
              collectionAction={addToCollectionAction}
              gameThumbnail={game.thumbnail}
              userId={session.user.id}
              gameTitle={game.title}
            />
          ) : null}
        </div>
        <pre className="text-wrap">
          <h3 className="text-sm text-primary-content md:text-xl">
            {game.description}
          </h3>
        </pre>
      </div>

      {/* Game Section */}
      <div className="mb-4 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-primary md:text-4xl">
          Screenshots
        </h1>
        <div className="mb-8 grid grid-cols-1 place-items-center items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          {game.screenshots.map((screenshot) => (
            <Modal
              alt={game.title}
              id={screenshot.id.toString()}
              src={screenshot.image}
              key={screenshot.id}
            />
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <GameCommentSection gameId={game.id.toString()} gameName={game.title} />
    </div>
  );
};

export default page;
