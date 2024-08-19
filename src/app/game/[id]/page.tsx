import React from "react";
import { GameData } from "../../../../type";
import GameCard from "@/app/components/ui/GameCard";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/app/lib/prisma";

const page = async ({ params }: { params: { id: string } }) => {
  const gamesRes = await fetch(
    `${process.env.API_BASE_URL}/game?id=${params.id}`,
  );
  const games: GameData = await gamesRes.json();
  const session = await getServerSession(authOptions);

  // const findAnime = await prisma.favoriteGame.findUnique({
  //   where: {
  //     gameId: params.id,
  //     userId: session?.user.id,
  //   }
  // })

  return (
    <div className="h-screen items-center justify-center">
      <GameCard {...games} />
      <pre>{JSON.stringify(session?.user.id)}</pre>
    </div>
  );
};

export default page;
