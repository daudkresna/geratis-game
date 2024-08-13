import React from "react";
import { GameData } from "../../../../type";
import GameCard from "@/app/components/ui/GameCard";

const page = async ({ params }: { params: { id: string } }) => {
  const gamesRes = await fetch(
    `${process.env.API_BASE_URL}/game?id=${params.id}`,
  );
  const games: GameData = await gamesRes.json();

  return (
    <div className="h-screen items-center justify-center">
      <GameCard {...games} />
    </div>
  );
};

export default page;
