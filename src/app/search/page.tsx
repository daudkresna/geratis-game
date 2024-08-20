import React from "react";
import SearchBar from "../components/ui/SearchBar";
import { GameData } from "../../../type";

const page = async () => {
  const gamesRes = await fetch(`${process.env.API_BASE_URL}/games`);
  const games: GameData[] = await gamesRes.json();
  return (
    <div className="flex h-screen flex-col px-0 md:px-16">
      <div className="py-8">
        <SearchBar games={games} />
      </div>
    </div>
  );
};

export default page;
