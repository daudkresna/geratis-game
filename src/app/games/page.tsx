import React from "react";
import { GameData } from "../../../type";
import GameCard from "../components/ui/GameCard";
import PaginationButton from "../components/PaginationButton";

const page = async ({
  searchParams,
}: {
  searchParams?: { page?: string; sortBy?: string };
}) => {
  const sortBy = searchParams?.sortBy || "popular";
  const res = await fetch(`${process.env.API_BASE_URL}/games?sort-by=popular`);
  const data: GameData[] = await res.json();

  //mengambil data dari url atau query
  const currentPage = Number(searchParams?.page) || 1;

  //Pagination Item
  const perPage: number = 10;
  const start = (currentPage - 1) * perPage;
  const end = currentPage * perPage - 1;
  const limit = data.length / perPage;

  //Slicing item sesuai pagination
  const filterPopular = data.slice(start, end);
  console.log(limit);
  return (
    <>
      <div className="flex flex-col items-center gap-4 px-16">
        <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
          <h1 className="font-bold">POPULAR GAME</h1>
          <PaginationButton page={currentPage} limit={limit} />
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-3 md:grid-rows-3">
          {filterPopular.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
        <PaginationButton page={currentPage} limit={limit} />
      </div>
    </>
  );
};

export default page;
