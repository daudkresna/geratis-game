import React from "react";
import { GameData } from "../../../../type";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/lib/prisma";
import Modal from "@/app/components/ui/ImageModal";
import Button from "@/app/components/ui/Button";
import { addToCollectionAction } from "@/app/actions/action";
import FormButton from "@/app/components/ui/FormButton";
import GameCommentSection from "@/app/components/GameCommentSection";

const page = async ({ params }: { params: { id: string } }) => {
  const gamesRes = await fetch(
    `${process.env.API_BASE_URL}/game?id=${params.id}`,
  );
  const game: GameData = await gamesRes.json();
  const session = await getServerSession(authOptions);
  let isFavorite = false;

  if (session) {
    const findAnime = await prisma.favoriteGame.findMany({
      where: {
        gameId: game.id.toString(),
        userId: session.user.id,
      },
    });
    console.log(findAnime);
    if (findAnime.length != 0) {
      isFavorite = true;
    }
  }

  console.log();
  return (
    <div className="h-screen w-full flex-col items-center justify-center px-16">
      {/* About Section */}
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-primary">
            {game.title}{" "}
            <div className="badge badge-secondary">{game.status}</div>
          </h1>
          {session && !isFavorite ? (
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
          <h3 className="text-xl text-primary-content">{game.description}</h3>
        </pre>
      </div>

      {/* Game Section */}
      <div className="mb-4 flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-primary">Screenshots</h1>
        <div className="mb-8 grid grid-cols-3 place-items-center justify-items-stretch gap-4">
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
      <GameCommentSection />
    </div>
  );
};

export default page;
