import React from "react";
import { GameData } from "../../../type";
import GameCard from "../components/ui/GameCard";
import PaginationButton from "../components/PaginationButton";

const page = async ({ searchParams }: { searchParams?: { page?: string } }) => {
  const res = await fetch(`${process.env.API_BASE_URL}/games?sort-by=popular`);
  const data: GameData[] = await res.json();

  //mengambil data dari url atau query
  const currentPage = Number(searchParams?.page) || 1;

  //Pagination Item
  const perPage: number = 10;
  const start = (currentPage - 1) * perPage;
  const end = currentPage * perPage - 1;

  //Slicing item sesuai pagination
  const filterPopular = data.slice(start, end);
  console.log(filterPopular.length);
  return (
    <>
      <div className="flex flex-col items-center gap-4 px-16">
        <div className="flex w-full flex-row items-center justify-between">
          <h1 className="font-bold">POPULAR GAME</h1>
          <PaginationButton page={currentPage} />
        </div>
        <div className="grid grid-cols-3 grid-rows-3 justify-items-center gap-8">
          {filterPopular.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
        <PaginationButton page={currentPage} />
      </div>
    </>
  );
};

export default page;
