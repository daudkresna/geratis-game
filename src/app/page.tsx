import Link from "next/link";
import { GameData } from "../../type";
import GameCard from "./components/ui/GameCard";
import LongGameCard from "./components/ui/LongGameCard";

export default async function Home() {
  const res = await fetch(`${process.env.API_BASE_URL}/games`);
  const data: GameData[] = await res.json();
  const [newRelease, popular]: [GameData[], GameData[]] = await Promise.all([
    fetch(`${process.env.API_BASE_URL}/games?sort-by=release-date`).then(
      (res) => res.json(),
    ),
    fetch(`${process.env.API_BASE_URL}/games?sort-by=popular`).then((res) =>
      res.json(),
    ),
  ]);
  const filterNew = newRelease.slice(0, 5);
  const filterPopular = popular.slice(0, 3);
  return (
    <>
      <div className="relative flex min-h-fit flex-col justify-evenly gap-8 md:flex-row md:gap-0">
        <div className="flex flex-col gap-4 px-2">
          <h1 className="font-bold">NEW RELEASE</h1>
          {filterNew.map((game) => (
            <Link href={`/game/${game.id}`} key={game.id}>
              <LongGameCard {...game} />
            </Link>
          ))}
          <div className="inline-flex justify-end">
            <button className="btn btn-accent w-36">Load More</button>
          </div>
        </div>
        <div className="relative flex flex-col gap-4 px-2">
          <h1 className="font-bold">POPULAR GAME</h1>
          <div className="mb-8 grid grid-rows-3 justify-items-center gap-8">
            {filterPopular.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
